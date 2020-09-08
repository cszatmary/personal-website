import React, { ReactElement } from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Christopher Szatmary's personal website. Christopher is a software developer who has experience with Fullstack Development, iOS Development, and Developer Acceleration."
          />
          <meta name="author" content="Christopher Szatmary" />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,600|Julius+Sans+One|Nunito"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
