import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "reactstrap";

import { Animation } from "@/components/Animation";
import { LinkBlank } from "@/components/LinkBlank";
import styles from "@/styles/pages/about.module.scss";
import { classNames } from "@/utils/mod";

const socialItems = [
  {
    name: "github",
    icon: "devicon-github-plain",
    link: "https://github.com/cszatma",
  },
  {
    name: "linkedin",
    icon: "devicon-linkedin-plain",
    link: "https://www.linkedin.com/in/christopherszatmary/",
  },
];

const skillItems = [
  { name: "Go", icon: "devicon-go-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "Swift", icon: "devicon-swift-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "React", icon: "devicon-react-plain" },
];

const AboutPage: FunctionComponent = () => {
  const links = socialItems.map((item) => (
    <LinkBlank href={item.link} className={classNames("mx-3", styles.socialLink)} key={item.name}>
      <i className={classNames("white-text fa-3x", item.icon)} />
    </LinkBlank>
  ));

  const skills = skillItems.map((item) => (
    <Col className="my-1" sm="6" lg="4" key={item.name}>
      <Row className="text-center align-items-center">
        <Col className="text-right" xs="6">
          <Animation animation="shake" hover>
            <i className={classNames(item.icon, styles.skillIcon)} />
          </Animation>
        </Col>
        <Col className="text-left" xs="6">
          <p className="m-0">{item.name}</p>
        </Col>
      </Row>
    </Col>
  ));

  return (
    <div className={classNames("d-flex flex-column flex-grow-1", styles.about)}>
      <Container className="py-4 d-flex flex-column justify-content-center">
        <h1 className="mb-4 mt-2 letter-spaced">ABOUT ME</h1>
        <Row className="align-items-center">
          <Col className="d-flex flex-column">
            {/* TODO get a proper image and add here */}
            {/* <img
              className="img-fluid align-self-center my-4"
              src="/images/profile.png"
              alt="Chris"
            /> */}
            <Row className="py-2">
              <p className="px-3">
                Hi I&apos;m Chris, a software developer with a passion for automation. I love
                building to tools to automate common tasks and solve interesting problems. I am
                currently enrolled at Ryerson University majoring in Computer Science and minoring
                in Mathematics.
              </p>
              <p className="px-3">
                I also enjoy playing pinball (real tables not digital) and watching hockey. I cheer
                for the Toronto Maple Leafs for better or for worse.
              </p>
            </Row>
            <Row className="py-2 align-self-center">{links}</Row>
          </Col>
        </Row>
      </Container>
      <Container className="py-3">
        <h2 className="my-2">What I do</h2>
        <Row className="mt-3">{skills}</Row>
        <Row className="justify-content-center my-3">
          <Col className="py-2">
            <p>
              I have experience with a lot of languages, libraries, and tools. Above are the main
              ones I currently use. I have experience with both fullstack and iOS development.
            </p>
            <p>
              I have recently fallen in love with the roles of developer acceleration and production
              engineering.
            </p>
            <p>
              This involves:
              <ul>
                <li>
                  Eliminating toil for developers to make it as easy as possible for them to do
                  their jobs.
                </li>
                <li>Create robust production systems that are easy to understand and maintain.</li>
              </ul>
            </p>
            <p>
              How are these goals achieved?
              <ul>
                <li>
                  Create tools to make it easy for developers to manage their local environment.
                </li>
                <li>Create CI pipelines to automate various tasks.</li>
                <li>Create CD pipelines to easily deploy applications to production.</li>
                <li>
                  Implement great observability to easy know the state of applications in
                  production.
                </li>
              </ul>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
