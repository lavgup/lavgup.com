import React from 'react';
import { Global, css } from '@emotion/react';
import {
    ChakraProvider,
    CSSReset,
    useColorMode
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/MDXComponents';
import theme from '../styles/theme';

import '../styles/globals.css';

import { prismLightTheme, prismDarkTheme } from '../styles/prism';

function GlobalStyles({ children }) {
    const { colorMode } = useColorMode();

    return (
        <>
            <CSSReset />
            <Global styles={css`
              ${colorMode === 'dark' ? prismDarkTheme : prismLightTheme};

              ::selection {
                background-color: #90CDF4;
                color: #fefefe;
              }
              ::-moz-selection {
                background: #ffb7b7;
                color: #fefefe;
              }
              html {
                min-width: 356px;
                scroll-behavior: smooth;
              }
              #__next {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background: ${colorMode === 'light' ? 'white' : '#171717'};
              }
            `} />
            {children}
        </>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <MDXProvider components={MDXComponents}>
                <GlobalStyles>
                    <Component {...pageProps} />
                </GlobalStyles>
            </MDXProvider>
        </ChakraProvider>
    )
}

export default MyApp;
