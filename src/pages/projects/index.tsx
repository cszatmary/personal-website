import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Container, Card, CardTitle, CardBody } from "reactstrap";

import styles from "@/styles/pages/projects/index.module.scss";
import { classNames } from "@/utils/mod";

const items = [
  {
    title: "tb CLI",
    text: "A CLI that makes it easy to run services and apps locally.",
    link: "/projects/tb",
  },
  {
    title: "commit-cannon",
    text: "A tool to automate changes across multiple git repos.",
    link: "/projects/commit-cannon",
  },
  // TODO add these later
  // {
  //   title: "dockerfiles",
  //   text: "A collection of useful dockerfiles for different situations.",
  //   link: "/projects/dockerfiles",
  // },
  // {
  //   title: "This website",
  //   text: "My personal website built with Next.js.",
  //   link: "/projects/personal-website",
  // },
];

const ProjectsPage: FunctionComponent = () => {
  const cards = items.map((item) => (
    <li className="col-sm-6 col-md-4 col-lg-3 py-2" key={item.title}>
      <Card className={styles.card}>
        <Link href={item.link}>
          <a className={styles.cardUrl}>
            <CardTitle className="mt-3 text-center" tag="h4">
              {item.title}
            </CardTitle>
          </a>
        </Link>
        <CardBody>
          <h5>{item.text}</h5>
        </CardBody>
      </Card>
    </li>
  ));

  return (
    <div className={classNames("white-text d-flex flex-grow-1", styles.projects)}>
      <Container className="py-3">
        <h1 className="my-3 letter-spaced">PROJECTS</h1>
        <p>These are some of the projects I have worked on. Click on one to learn more.</p>
        <ul className="row list-unstyled">{cards}</ul>
      </Container>
    </div>
  );
};

export default ProjectsPage;
