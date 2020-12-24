import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '../styles/globals.css';

const theme = extendTheme({
    config: {
        useSystemColorMode: false,
        initialColorMode: 'dark'
    }
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp;
