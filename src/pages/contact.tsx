import React, { Component, ReactNode } from "react";
import { Container, Row } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ContactButton } from "@/components/ContactButton";
import { ContactForm, FormValues, inputsKey } from "@/components/ContactForm";
import { Loader } from "@/components/Loader";
import { LinkBlank } from "@/components/LinkBlank";
import styles from "@/styles/pages/contact.module.scss";
import { classNames, constants } from "@/utils/mod";

const statuses = {
  success: {
    title: "Thanks for reaching out!",
    subtitle: "I'll be in touch shortly.",
    buttonTitle: "NEW FORM",
  },
  error: {
    title: "There was an error",
    subtitle: "Please try again",
    buttonTitle: "RESUBMIT",
  },
};

interface State {
  formIsVisible: boolean;
  formSubmittedOk: boolean;
  submissionPending: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class ContactPage extends Component<{}, State> {
  state: State = {
    formIsVisible: true,
    formSubmittedOk: true,
    submissionPending: false,
  };

  handleFormSubmit = (formValues: FormValues): void => {
    fetch("/api/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((res) => {
      // 200...299 -> successful
      const successful = res.status >= 200 && res.status < 300;

      // Clear inputs in session storage when submission was successful
      // Keep it if failed so user can try submitting again
      if (successful) {
        sessionStorage.removeItem(inputsKey);
      }

      // Set a timeout to ensure the loader is shown for at least 1 sec
      // otherwise the animation is too janky
      setTimeout(
        () =>
          this.setState({
            formSubmittedOk: successful,
            submissionPending: false,
          }),
        1000,
      );
    });

    this.setState({ formIsVisible: false, submissionPending: true });
  };

  handleNewFormClicked = (): void => {
    this.setState({ formIsVisible: true });
  };

  renderContent(): ReactNode {
    if (this.state.formIsVisible) {
      return <ContactForm onSubmit={this.handleFormSubmit} />;
    }

    if (this.state.submissionPending) {
      return <Loader className="text-center" size="1.5rem" margin="0.5rem 0.125rem 0.125rem" />;
    }

    const status = this.state.formSubmittedOk ? statuses.success : statuses.error;

    return (
      <CSSTransition classNames="fade" timeout={1000}>
        <div className="my-5 text-center">
          <h2 className="mb-3">{status.title}</h2>
          <h3 className="mb-3">{status.subtitle}</h3>
          <ContactButton className="pt-2 my-3" size="lg" onClick={this.handleNewFormClicked}>
            {status.buttonTitle}
          </ContactButton>
        </div>
      </CSSTransition>
    );
  }

  render(): ReactNode {
    const { formIsVisible } = this.state;

    return (
      <div className={classNames("white-text d-flex flex-grow-1", styles.contact)}>
        <Container className="py-5">
          <h1 className="my-4 letter-spaced text-center">CONTACT</h1>
          <hr className={styles.headerUnderline} />
          <Row className="pt-4 justify-content-center">
            <div>
              <h5>
                <strong>Email: </strong>
                <LinkBlank className={styles.link} href={`mailto:${constants.email}`}>
                  {constants.email}
                </LinkBlank>
              </h5>
              <h5>
                <strong>GitHub: </strong>
                <LinkBlank className={styles.link} href={constants.github}>
                  cszatmary
                </LinkBlank>
              </h5>
              <h5>
                <strong>LinkedIn: </strong>
                <LinkBlank className={styles.link} href={constants.linkedin}>
                  in/christopherszatmary
                </LinkBlank>
              </h5>
            </div>
          </Row>
          <Row className="justify-content-center mt-3">
            <TransitionGroup
              className={classNames("col-md-8", formIsVisible ? styles.formContainer : undefined)}
            >
              {this.renderContent()}
            </TransitionGroup>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ContactPage;
