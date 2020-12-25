import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="/static/favicon.ico" rel="shortcut icon" />
                    <link
                        href="/static/favicon.ico"
                        rel="icon"
                        sizes="32x32"
                        type="image/png"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;