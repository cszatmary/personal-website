import React, { FunctionComponent, CSSProperties, ReactNode } from "react";
import { Button } from "reactstrap";

import styles from "@/styles/components/ContactButton.module.scss";
import { classNames } from "@/utils/mod";

export interface ContactButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export const ContactButton: FunctionComponent<ContactButtonProps> = (props) => {
  return (
    <Button
      className={classNames(styles.contactButton, props.className)}
      color="white"
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      style={props.style}
    >
      {props.children}
    </Button>
  );
};
