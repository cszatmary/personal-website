import React, { FunctionComponent, CSSProperties } from "react";

export interface LogoImgProps {
  version: "default" | "white" | "mixed";
  style?: CSSProperties;
}

const images = {
  default: "/images/logo/logo.png",
  white: "/images/logo/logo-white.png",
  mixed: "/images/logo/logo-mixed.png",
};

export const LogoImg: FunctionComponent<LogoImgProps> = ({ version, style, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <img {...props} style={style} src={images[version]} alt="CS Logo" />
);

LogoImg.defaultProps = {
  version: "default",
  style: {
    width: "3rem",
    height: "2.451rem", // height is 0.817 * width
  },
};
