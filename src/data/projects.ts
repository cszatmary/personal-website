import { panic } from "@cszatma/node-stdlib";

export interface ProjectData {
  links: Record<string, { text: string; link: string } | undefined>;
}

export interface Project {
  name: string;
  card: {
    title: string;
    description: string;
  };
  title: string;
  image?: string;
  imageAlt?: string;
  sections: {
    main: string[];
    technologies: string[];
    links: string[];
  };
  data: ProjectData;
}

const tbProject: Project = {
  name: "tb",
  card: {
    title: "tb CLI",
    description: "A CLI that makes it easy to run services and apps locally.",
  },
  title: "tb CLI - Easily run apps and services locally",
  image: "/images/projects/tb-main.jpg",
  imageAlt: "tb CLI",
  sections: {
    main: [
      `$(code, tb) is a tool design to make it really easy to run services locally through
      docker. It automatically takes care of grabbing the latest version of a service, building
      it if needed, performing any necessary actions before starting the service (ex: database
      migrations). It can run groups of services that are defined in a playlist. It can also run
      iOS applications in the iOS simulator if you are on macOS. I helped build $(code, tb)
      while I worked at TouchBistro.`,
      `$(code, tb) was a great learning experience with regards to how to design a good
      program and evolve it over time. When it was first built our goal was to have a good
      internal tool that worked for TouchBistro developers for their specific use cases.
      However, later on we saw how useful and effective $(code, tb) was and we wanted to
      share it with the rest of the world so we decided to open source it. This presented the
      challenge of how to generalize all the functionality so it didn&apos;t assume anything
      specific about TouchBistro. The forced us to design a good interface that was easy to use
      out of the box but also allowed for customization where necessary.`,
    ],
    technologies: [
      `$(code, tb) is built in Go. Go is a great language for writing CLI tools. It is simple
      and easy to learn but fast and powerful. This was the first time I ever used Go and
      working on a non-trivial program like $(code, tb) helped me get really comfortable
      with it.`,
      `$(code, tb) also heavily relies on docker and docker-compose. Docker allows it so that
      $(code, tb) can be language agnostic. It does not matter if your service is written in
      Go, Ruby, JavaScript, etc, as long as it can run in a docker container $(code, tb) can
      run it. This was a great opportunity to get really familiar with docker since I needed a
      solid understanding of of how docker works in order to implement the desired functionality
      in tb.`,
    ],
    links: [
      `Check out the $(link, GITHUB_REPO) for more information about $(code, tb) and how to use it.
      Also check out the $(link, BLOG_POST) I wrote for the TouchBistro Engineering blog about $(code, tb).`,
    ],
  },
  data: {
    links: {
      GITHUB_REPO: {
        text: "GitHub repo",
        link: "https://github.com/TouchBistro/tb",
      },
      BLOG_POST: {
        text: "blog post",
        link:
          "https://medium.com/touchbistro-development/tb-cli-simplifying-development-in-a-complicated-microservices-world-65da00a14c87",
      },
    },
  },
};

const cannonProject: Project = {
  name: "cannon",
  card: {
    title: "commit-cannon",
    description: "A tool to automate changes across multiple git repos.",
  },
  title: "commit-cannon - Automate changes across git repos",
  sections: {
    main: [
      `$(code, commit-cannon) is a small CLI tool that allows you to apply changes to multiple repos.
      It is very useful if there are a number of small changes that all need to be made to a large amount of repos.
      While working on the Developer Accelerate team at TouchBistro I noticed that we frequently had this use case.
      We had 20+ microservices that we needed to make the same configuration changes to.
      Having to go into each repo and make the changes was an extremely tedious process, so I decided to automate it.`,
      `The biggest challenge with $(code, commit-cannon) was coming up with a a simple yet flexible and robust configuration format.
      The config file needed to be able to express all the various use cases required (modify lines, delete lines, create files, etc)
      but also be easy to understand and use. I created a set of actions that seemed to cover all use cases and also allowed
      regular expressions to be used when matching text in files.`,
    ],
    technologies: [`$(code, commit-cannon) is built in Go.`],
    links: [
      `Check out the $(link, GITHUB_REPO) for more information about $(code, commit-cannon) and how to use it.
      Also check out the $(link, BLOG_POST) I wrote for the TouchBistro Engineering blog about $(code, commit-cannon).`,
    ],
  },
  data: {
    links: {
      GITHUB_REPO: {
        text: "GitHub repo",
        link: "https://github.com/TouchBistro/cannon",
      },
      BLOG_POST: {
        text: "blog post",
        link:
          "https://medium.com/touchbistro-development/commit-cannon-open-source-project-899ee75794c0",
      },
    },
  },
};

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

const projects = [tbProject, cannonProject];
const projectPositions = new Map<string, number>();

for (let i = 0; i < projects.length; i++) {
  projectPositions.set(projects[i].name, i);
}

export function find(name: string): Project {
  const pos = projectPositions.get(name);
  if (pos === undefined) {
    panic(`find: No such project ${name}`);
  }

  return projects[pos];
}

export function all(): Project[] {
  return [...projects];
}

export function previous(project: Project): Project {
  const pos = projectPositions.get(project.name);
  if (pos === undefined) {
    panic(`previous: Project ${project.name} not found`);
  }

  let index = pos - 1;
  if (index < 0) {
    index = projects.length - 1;
  }

  return projects[index];
}

export function next(project: Project): Project {
  const pos = projectPositions.get(project.name);
  if (pos === undefined) {
    panic(`next: Project ${project.name} not found`);
  }

  let index = pos + 1;
  if (index >= projects.length) {
    index = 0;
  }

  return projects[index];
}
