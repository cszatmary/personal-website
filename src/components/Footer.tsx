import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "@/styles/components/Footer.module.scss";
import { classNames } from "@/utils/mod";
import { LogoImg } from "./LogoImg";

export const Footer: FunctionComponent = () => (
  <footer className={classNames(styles.footer, "white-text nunito")}>
    <Container fluid>
      <Row className="align-items-center">
        <Col className="text-center py-3" xs="12" md="5">
          <span className={styles.csSpan}>Developed by Christopher Szatmary</span>
        </Col>
        <Col className="text-center py-2" xs="12" md="2">
          <LogoImg version="mixed" />
        </Col>
        <Col className="text-center py-3" xs="12" md="5">
          All rights reserved.&nbsp;
          <span className={styles.csSpan}>Copyright © 2017-2020 Christopher Szatmary.</span>
        </Col>
      </Row>
    </Container>
  </footer>
);
