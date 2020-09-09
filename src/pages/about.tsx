import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";

import { Animation } from "@/components/Animation";
import { LinkBlank } from "@/components/LinkBlank";
import styles from "@/styles/pages/about.module.scss";
import { classNames, constants } from "@/utils/mod";

const skillItems = [
  { name: "Go", icon: "devicon-go-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "Swift", icon: "devicon-swift-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "React", icon: "devicon-react-plain" },
];

const AboutPage: FunctionComponent = () => {
  const skills = skillItems.map((item) => (
    <Col className="my-1" sm="6" lg="4" key={item.name}>
      <Row className="align-items-center">
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
                building tools to automate common tasks and solve interesting problems. I am
                currently enrolled at Ryerson University majoring in Computer Science and minoring
                in Mathematics.
              </p>
              <p className="px-3">
                I also enjoy playing pinball (real tables not digital) and watching hockey. I cheer
                for the Toronto Maple Leafs for better or for worse.
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="py-3">
        <h2 className="my-2">What I do</h2>
        <p>
          I have experience with a lot of languages, libraries, and tools. Here are the main ones I
          currently use:
        </p>
        <Row className="my-3">{skills}</Row>
        <p>
          I have recently fallen in love with the roles of developer acceleration and production
          engineering.
        </p>
      </Container>
      <Container className="py-3">
        <h2 className="my-2">What even is Developer Acceleration?</h2>
        <p>
          Developer Acceleration is all about making it easy as possible for developers to deliver
          value to customers. I build tools to make local development as easy and painless as
          possible. I also set up CI/CD processes to make it easy and safe to ship code to
          production and roll it back when something goes wrong.
        </p>
        <p>
          I&apos;ve always enjoyed the area of developer efficiency and Developer Acceleration has
          been a perfect fit for me. Any time I find something tedious that I constantly have to do
          that slows me down, or I find something that is way harder than it should be, I find a way
          to automate it.
        </p>
      </Container>
      <Container className="py-3">
        <h2 className="my-2">Want to know more?</h2>
        <p>
          <span>Check out some of the </span>
          <Link href="/projects">
            <a>projects</a>
          </Link>
          <span> I&apos;ve done, or </span>
          <Link href="/contact">
            <a>contact me</a>
          </Link>
          <span>.</span>
        </p>
        <p>
          <span>Also check out my </span>
          <LinkBlank href={constants.github}>GitHub</LinkBlank>
          <span> and </span>
          <LinkBlank href={constants.linkedin}>LinkedIn</LinkBlank>
          <span>.</span>
        </p>
      </Container>
    </div>
  );
};

export default AboutPage;
