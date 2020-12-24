import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';

const theme = extendTheme({
    config: {
        useSystemColorMode: 'false',
        initialColorMode: 'dark'
    }
});

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp;
