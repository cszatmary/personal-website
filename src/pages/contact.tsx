import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ContactButton } from "@/components/ContactButton";
import { ContactForm, FormValues, inputsKey } from "@/components/ContactForm";
import { Loader } from "@/components/Loader";
import styles from "@/styles/pages/contact.module.scss";
import { classNames } from "@/utils/mod";

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
    // TODO stop using formspree
    fetch("https://formspree.io/cs@christopherszatmary.com", {
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

  renderContent(): JSX.Element {
    if (this.state.formIsVisible) {
      return <ContactForm onSubmit={this.handleFormSubmit} />;
    }

    if (this.state.submissionPending) {
      return <Loader size="1.5rem" margin="0.5rem 0.125rem 0.125rem" />;
    }

    const status = this.state.formSubmittedOk ? statuses.success : statuses.error;

    return (
      <CSSTransition classNames="fade" timeout={1000}>
        <div className="my-5">
          <h2 className="mb-3">{status.title}</h2>
          <h3 className="mb-3">{status.subtitle}</h3>
          <ContactButton className="pt-2 my-3" size="lg" onClick={this.handleNewFormClicked}>
            {status.buttonTitle}
          </ContactButton>
        </div>
      </CSSTransition>
    );
  }

  render(): JSX.Element {
    const { formIsVisible } = this.state;

    return (
      <div className={classNames("white-text d-flex flex-grow-1", styles.contact)}>
        <Container className="text-center py-5">
          <h1 className="my-4 letter-spaced">CONTACT</h1>
          <hr className={styles.headerUnderline} />
          <Row className="pt-4">
            <Col>
              <h5>Email: cs@christopherszatmary.com</h5>
            </Col>
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
