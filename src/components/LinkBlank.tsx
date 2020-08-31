import React, { FunctionComponent } from "react";

export interface LinkBlankProps {
  href: string;
  className?: string;
  id?: string;
}

export const LinkBlank: FunctionComponent<LinkBlankProps> = ({ href, className, id, children }) => (
  <a id={id} href={href} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
