import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Container, Card, CardTitle, CardBody } from "reactstrap";

import type { Project } from "@/data/projects";
import * as projects from "@/data/projects";
import styles from "@/styles/pages/projects/index.module.scss";
import { classNames } from "@/utils/mod";

interface Props {
  projects: Project[];
}

const ProjectsPage: FunctionComponent<Props> = (props) => {
  const cards = props.projects.map(({ name, card }) => (
    <li className="col-sm-6 col-md-4 col-lg-3 py-2" key={card.title}>
      <Card className={styles.card}>
        <Link href="/projects/[project]" as={`/projects/${name}`}>
          <a className={styles.cardUrl}>
            <CardTitle className="mt-3 text-center" tag="h4">
              {card.title}
            </CardTitle>
          </a>
        </Link>
        <CardBody>
          <h5>{card.description}</h5>
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      projects: projects.all(),
    },
  };
};
