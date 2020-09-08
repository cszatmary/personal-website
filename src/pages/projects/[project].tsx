import React, { FunctionComponent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Container } from "reactstrap";
import { panic } from "@cszatma/node-stdlib";

import { ProjectContent } from "@/components/ProjectContent";
import type { Project } from "@/data/projects";
import * as projects from "@/data/projects";
import styles from "@/styles/pages/projects/[project].module.scss";
import { classNames } from "@/utils/mod";

interface Props {
  project: Project;
  previous: {
    name: string;
    title: string;
  };
  next: {
    name: string;
    title: string;
  };
}

const ProjectPage: FunctionComponent<Props> = (props) => {
  const { project } = props;

  let img: React.ReactNode = null;
  if (project.image) {
    img = (
      <img
        className={classNames("img-fluid mx-auto my-3")}
        src={project.image}
        alt={project.imageAlt}
      />
    );
  }

  return (
    <div className={classNames("d-flex flex-column flex-grow-1", styles.projects)}>
      <Container className="py-3 d-flex flex-column">
        <h2 className="my-2">{project.title}</h2>
        {img}
        {project.sections.main.map((template) => (
          <ProjectContent template={template} data={project.data} />
        ))}
      </Container>
      <Container className="py-3">
        <h3 className="my-2">What technologies does it use?</h3>
        {project.sections.technologies.map((template) => (
          <ProjectContent template={template} data={project.data} />
        ))}
      </Container>
      <Container className="py-3">
        <h3 className="my-2">Want to know more?</h3>
        {project.sections.links.map((template) => (
          <ProjectContent template={template} data={project.data} />
        ))}
      </Container>
      <Container className={classNames("py-3", styles.navContainer)}>
        <Link href="/projects/[project]" as={`/projects/${props.previous.name}`}>
          <a className={classNames("btn btn-lg", styles.navLink)}>
            <h5 className="pt-1 mb-0">{props.previous.title}</h5>
          </a>
        </Link>
        <Link href="/projects">
          <a className={classNames("btn btn-lg", styles.navLink)}>
            <h5 className="pt-1 mb-0">Projects</h5>
          </a>
        </Link>
        <Link href="/projects/[project]" as={`/projects/${props.next.name}`}>
          <a className={classNames("btn btn-lg", styles.navLink)}>
            <h5 className="pt-1 mb-0">{props.next.title}</h5>
          </a>
        </Link>
      </Container>
    </div>
  );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.all().map((project) => {
    return {
      params: { project: project.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const projectName = ctx.params?.project;
  if (typeof projectName !== "string") {
    panic(`Project name is not a string: ${ctx.params?.project}`);
  }

  const project = projects.find(projectName);
  const previous = projects.previous(project);
  const next = projects.next(project);
  return {
    props: {
      project,
      previous: {
        name: previous.name,
        title: previous.card.title,
      },
      next: {
        name: next.name,
        title: next.card.title,
      },
    },
  };
};
