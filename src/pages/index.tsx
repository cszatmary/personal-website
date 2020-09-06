import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";

import styles from "@/styles/pages/index.module.scss";
import { classNames } from "@/utils/mod";

const IndexPage: FunctionComponent = () => {
  return (
    <div className={classNames("align-items-center d-flex flex-grow-1", styles.intro)}>
      <Container className={classNames("text-center white-text", styles.introBody)}>
        <Row className="align-items-center mb-2 justify-content-center">
          <Col className={styles.logoContainer} md="3" lg="4">
            <img
              className={classNames("img-fluid mx-auto", styles.logoMain)}
              src="/images/logo/logo-white.png"
              alt="Logo"
            />
          </Col>
          <Col className={classNames("pt-3", styles.introContent)} md="9" lg="8">
            <h2 className="mb-1 px-1">Christopher Szatmary</h2>
            <h2 className="mb-1 ml-2 px-1">
              <span className={styles.logoColored}>&lt;</span>
              software developer
              <span className={styles.logoColored}>/&gt;</span>
            </h2>
          </Col>
          <Link href="/about">
            <a className={classNames("btn btn-lg", styles.aboutLink)}>About Me</a>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default IndexPage;
