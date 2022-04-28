import React, { FunctionComponent, ReactNode } from "react";

import type { ProjectData } from "@/data/projects";
import { LinkBlank } from "./LinkBlank";

export interface ProjectContentProps {
  template: string;
  data: ProjectData;
}

export const ProjectContent: FunctionComponent<ProjectContentProps> = (props) => {
  const { template, data } = props;
  const funcRegex = /\$\(([\w]+), ([\w-\s]+)\)/g;
  let match: RegExpExecArray | null;
  const elements: ReactNode[] = [];
  let startIndex = 0;

  // eslint-disable-next-line no-cond-assign
  while ((match = funcRegex.exec(template)) != null) {
    const funcName = match[1];
    const arg = match[2];
    elements.push(template.slice(startIndex, match.index));
    startIndex = funcRegex.lastIndex;

    // Handle func
    if (funcName === "link") {
      const linkDetails = data.links[arg];
      if (linkDetails === undefined) {
        // eslint-disable-next-line no-restricted-syntax
        throw new Error(`key ${arg} not in links dictionary`);
      }

      elements.push(
        <LinkBlank key={elements.length} href={linkDetails.link}>
          {linkDetails.text}
        </LinkBlank>,
      );
    } else if (funcName === "code") {
      elements.push(<code key={elements.length}>{arg}</code>);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      throw new Error(`unknown func name ${funcName}`);
    }
  }

  elements.push(template.slice(startIndex));

  return <p>{elements}</p>;
};
