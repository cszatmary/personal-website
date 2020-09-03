import { NextApiRequest, NextApiResponse } from "next";
import MailService from "@sendgrid/mail";
import nodeFetch from "node-fetch";
import { Result, env, log } from "@cszatma/node-stdlib";

const fetch = Result.resultifyPromise(nodeFetch);
log.std.formatter = new log.TextFormatter({ disableTimestamp: true });

async function emailHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).send(`Method ${req.method} not allowed`);
    return;
  }

  const requiredEnvVars = ["SENDGRID_API_KEY", "RECAPTCHA_SECRET_KEY"];
  const missingEnvVars: string[] = [];
  for (const envVar of requiredEnvVars) {
    if (!env.isEnvSet(envVar)) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    log.std.error("Missing required env var(s)", {
      envVars: missingEnvVars,
    });
    res.status(500).json({
      error: {
        code: "err_missing_env_vars",
        message: `Missing the required env var(s): ${missingEnvVars.join(", ")}`,
      },
    });
    return;
  }

  MailService.setApiKey(env.getEnv("SENDGRID_API_KEY"));

  // Verify all fields are present in the body
  const requiredFields = ["name", "email", "subject", "message", "recaptchaKey"];
  const missingFields: string[] = [];
  for (const field of requiredFields) {
    if (typeof req.body[field] !== "string") {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      error: {
        code: "err_missing_body_fields",
        message: `Missing the required field(s) from the request body: ${missingFields.join(", ")}`,
      },
    });
    return;
  }

  // Verify reCAPTCHA
  const result = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: `secret=${env.getEnv("RECAPTCHA_SECRET_KEY")}&response=${req.body.recaptchaKey}`,
  });

  if (result.isFailure()) {
    log.std.error("Failed to verify reCAPTCHA", {
      error: result.failure(),
    });
    res.status(500).json({
      error: {
        code: "err_recaptcha_verify_failed",
        message: "Failed to verify reCAPTCHA",
      },
    });
    return;
  }

  const verifyBody = await result.success().json();
  if (!verifyBody.success) {
    log.std.warn("reCAPTCHA verification failed", {
      result: verifyBody,
    });
    res.status(400).json({
      error: {
        code: "err_invalid_recaptcha",
        message: "Invalid reCAPTCHA value provided",
      },
    });
    return;
  }

  // TODO make this look nicer later
  const emailBody = `<strong>Name:</strong>
  <p>${req.body.name}r</p>
  <strong>Email:</strong>
  <p>${req.body.email}</p>
  <strong>Subject:</strong>
  <p>${req.body.subject}</p>
  <strong>Message:</strong>
  <p>${req.body.message}</p>`;

  try {
    await MailService.send({
      to: "cs@christopherszatmary.com",
      from: "noreply@christopherszatmary.com",
      subject: "New contact form submission",
      html: emailBody,
    });
  } catch (err) {
    // TODO figure out better error handling
    // need to figure out what err actually is
    log.std.error("Failed to send email", {
      error: err,
    });
    res.status(500).json({
      error: {
        code: "err_send_email",
        message: "Failed to send email",
      },
    });
    return;
  }

  res.status(200).json({});
}

export default emailHandler;
