import React from 'react';
import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';

import '../styles/globals.css';
import MDXComponents from '../components/MDXComponents';

export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute='class' defaultTheme='system'>
			<MDXProvider components={MDXComponents}>
				<Component {...pageProps} />
			</MDXProvider>
		</ThemeProvider>
	);
}