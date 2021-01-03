import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
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
            `} />
            {children}
        </>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <MDXProvider components={MDXComponents}>
                <GlobalStyles>
                    <DefaultSeo {...SEO} />
                    <Component {...pageProps} />
                </GlobalStyles>
            </MDXProvider>
        </ChakraProvider>
    )
}

export default MyApp;
