import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';

import '../styles/globals.css';
import MDXComponents from '../components/MDXComponents';
import { usePanelbear } from '../lib/analytics';

export default function MyApp({ Component, pageProps }) {
	usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
		scriptSrc: '/bear.js',
		debug: false
	});

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<MDXProvider components={MDXComponents}>
				<Component {...pageProps} />
			</MDXProvider>
		</ThemeProvider>
	);
}