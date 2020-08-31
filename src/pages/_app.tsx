import React, { FunctionComponent } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default MyApp;
