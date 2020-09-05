import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "@/styles/components/Footer.module.scss";
import { classNames, constants } from "@/utils/mod";
import { LinkBlank } from "./LinkBlank";
import { LogoImg } from "./LogoImg";

export const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col className={classNames("py-3", styles.leftSection)} xs="12" md="5">
            <span className={styles.leftSpan}>Developed by Christopher Szatmary</span>
            <div className={styles.linkGroup}>
              <LinkBlank href={constants.github} className={classNames("mx-2", styles.socialLink)}>
                <i className={classNames("devicon-github-plain", styles.socialIcon)} />
              </LinkBlank>
              <LinkBlank
                href={constants.linkedin}
                className={classNames("mx-2", styles.socialLink)}
              >
                <i className={classNames("devicon-linkedin-plain", styles.socialIcon)} />
              </LinkBlank>
            </div>
          </Col>
          <Col className="text-center py-2" xs="12" md="2">
            <LogoImg version="mixed" />
          </Col>
          <Col className="text-center py-3" xs="12" md="5">
            All rights reserved.&nbsp;
            <span className={styles.rightSpan}>Copyright © 2017-2020 Christopher Szatmary.</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
