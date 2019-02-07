import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  public render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{`
            *,
            *:after,
            *:before {
              margin: 0;
              padding: 0;
              box-sizing: inherit;
            }

            html {
              font-size: 62.5%;
            }

            body {
              box-sizing: border-box;
              font-family: Open Sans, sans-serif;
              font-weight: 400;
              font-size: 1.6rem;
              line-height: 1.6;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
