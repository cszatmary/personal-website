import React, { FunctionComponent } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "devicon/devicon.min.css";
import "@/styles/globals.scss";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const navItems = new Map([
  ["intro", "/"],
  ["about", "/about"],
  ["projects", "/projects"],
  ["contact", "/contact"],
]);

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="d-flex flex-column full-min-height">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Christopher Szatmary</title>
      </Head>
      <header>
        <Navbar brandText="CHRISTOPHER SZATMARY" items={navItems} className="julius-sans" />
      </header>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default App;
