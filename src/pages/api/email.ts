import { NextApiRequest, NextApiResponse } from "next";
import MailService from "@sendgrid/mail";

async function emailHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).send(`Method ${req.method} not allowed`);
    return;
  }

  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    res.status(500).json({
      error: {
        code: "err_missing_env_var",
        message: `Missing value for env var SENDGRID_API_KEY`,
      },
    });
    return;
  }

  MailService.setApiKey(sendgridApiKey);

  // Verify all fields are present in the body
  const requiredFields = ["name", "email", "subject", "message"];
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
    console.error(err);
    res.status(500).json({
      error: {
        code: "err_send_email",
        message: "Failed to send email",
      },
    });
  }

  res.status(200).json({});
}

export default emailHandler;
