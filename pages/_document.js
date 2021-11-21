/* pages/_document.js */

import NextDocument, {
  Html, Head, Main, NextScript
} from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>EKKO Academy Minting</title>
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&family=Space+Mono&display=swap"
    rel="stylesheet" />
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

