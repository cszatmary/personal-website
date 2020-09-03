import React, { Component, FormEvent, ChangeEvent } from "react";
import { Form, FormGroup, Input, InputProps, FormFeedback } from "reactstrap";
import validator from "validator";

import styles from "@/styles/components/ContactForm.module.scss";
import { classNames } from "@/utils/mod";
import { ContactButton } from "./ContactButton";

export interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (formValues: FormValues) => void;
}

interface InputState {
  value: string;
  error?: string;
}

interface State {
  inputs: {
    name: InputState;
    email: InputState;
    subject: InputState;
    message: InputState;
    [key: string]: InputState;
  };
  gotcha: string;
}

export const inputsKey = "inputs";

function initialInputsState(): State["inputs"] {
  const inputs = {
    name: { value: "" },
    email: { value: "" },
    subject: { value: "" },
    message: { value: "" },
  };

  if (typeof sessionStorage === "undefined") {
    return inputs;
  }

  const parsedValue: unknown = JSON.parse(sessionStorage.getItem(inputsKey) || "null");
  if (typeof parsedValue !== "object" || !parsedValue) {
    return inputs;
  }

  const savedInputs = parsedValue as Record<string, unknown>;
  for (const [name, input] of Object.entries(inputs)) {
    if (!(name in savedInputs)) {
      continue;
    }

    if (typeof savedInputs[name] !== "object" || !savedInputs[name]) {
      continue;
    }

    const savedInput = savedInputs[name] as Record<string, unknown>;
    if (typeof savedInput.value === "string") {
      input.value = savedInput.value;
    }
  }

  return inputs;
}

export class ContactForm extends Component<ContactFormProps, State> {
  state: State = {
    inputs: initialInputsState(),
    gotcha: "",
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    // If gotcha don't worry about error as it isn't validated
    if (name === "gotcha") {
      this.setState({ gotcha: value });
      return;
    }

    const { inputs } = this.state;

    // Update value
    inputs[name] = { value };
    this.setState({ inputs });

    // Update local storage with new values
    sessionStorage.setItem(inputsKey, JSON.stringify(inputs));
  };

  handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // If gotcha is filled prevent form submit
    if (this.state.gotcha) {
      return;
    }

    const { inputs } = this.state;

    // Validate inputs before submitting
    let hasError = false;
    for (const [name, input] of Object.entries(inputs)) {
      // Make sure field isn't empty
      if (input.value.trim() === "") {
        const field = name.charAt(0).toUpperCase() + name.slice(1);
        input.error = `${field} Required`;
        hasError = true;
      } else if (name === "email" && !validator.isEmail(input.value)) {
        input.error = "Invalid Email";
        hasError = true;
      }
    }

    // If there were errors, abort the submit and display the errors
    if (hasError) {
      this.setState({ inputs });
      return;
    }

    // Put all data from inputs into FormData
    const formValues: FormValues = {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim().toLowerCase(),
      subject: inputs.subject.value.trim(),
      message: inputs.message.value.trim(),
    };

    // Pass data to parent
    this.props.onSubmit(formValues);
  };

  render(): JSX.Element {
    const { inputs } = this.state;
    const inputComponents = Object.entries(inputs).map(([name, input]) => {
      let type: InputProps["type"];
      let rows: string | undefined;

      // Certain inputs have special values
      if (name === "email") {
        type = "email";
      } else if (name === "message") {
        type = "textarea";
        rows = "8";
      }

      return (
        <FormGroup key={name} className="my-4 px-2 form-input">
          <Input
            className={classNames("py-2", styles.input)}
            type={type}
            name={name}
            placeholder={name.toUpperCase()}
            value={input.value}
            invalid={Boolean(input.error)}
            onChange={this.handleInputChange}
            rows={rows}
          />
          <FormFeedback className={styles.errorMessage}>{input.error ?? ""}</FormFeedback>
        </FormGroup>
      );
    });

    return (
      <Form onSubmit={this.handleFormSubmit} noValidate>
        {inputComponents}
        <Input
          className="d-none"
          name="gotcha"
          value={this.state.gotcha}
          onChange={this.handleInputChange}
        />
        <ContactButton className="pt-3 pb-2 my-2">SUBMIT</ContactButton>
      </Form>
    );
  }
}
