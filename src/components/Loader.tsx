import React, { FunctionComponent, CSSProperties } from "react";

import styles from "@/styles/components/Loader.module.scss";

export interface LoaderProps {
  className?: string;
  color?: string;
  loading?: boolean;
  margin: string;
  size: string;
}

function createStyles(props: LoaderProps): CSSProperties {
  return {
    backgroundColor: props.color,
    width: props.size,
    height: props.size,
    margin: props.margin,
  };
}

export const Loader: FunctionComponent<LoaderProps> = (props) => {
  if (!props.loading) {
    return null;
  }

  return (
    <div className={props.className}>
      <div className={styles.loaderBeat1} style={createStyles(props)} />
      <div className={styles.loaderBeat2} style={createStyles(props)} />
      <div className={styles.loaderBeat3} style={createStyles(props)} />
    </div>
  );
};

Loader.defaultProps = {
  color: "#FFFFFF",
  loading: true,
};
