import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/inter-var-latin.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link href="/static/favicon.ico" rel="shortcut icon" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com/"
                        crossOrigin=""
                    />
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