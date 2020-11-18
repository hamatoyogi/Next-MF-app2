import Document, { Html, Head, Main, NextScript } from "next/document";
import { patchSharing } from "@module-federation/nextjs-mf";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        {patchSharing()}
        <script src={ process.env.NEXT_PUBLIC_REMOTE_PATH } />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;