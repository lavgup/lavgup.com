import React from 'react';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<Component {...pageProps} />
		</ThemeProvider>
	)
}