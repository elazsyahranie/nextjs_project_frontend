import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* <h1>Hello !</h1> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// Ini namanya Custom Document. Yang akan diterapkan ke semua halaman.
// Tulisan hello di atas akan muncul di halaman Login, Register, dll.
// Di render di sisi server
