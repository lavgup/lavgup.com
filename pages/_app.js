import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';

import '../styles/globals.css';
import MDXComponents from '../components/MDXComponents';
import splitbee from '@splitbee/web';

export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			splitbee.init({
				apiUrl: '/_hive',
				scriptUrl: '/bee.js'
			});
		}
	}, []);

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<MDXProvider components={MDXComponents}>
				<Component {...pageProps} />
			</MDXProvider>
		</ThemeProvider>
	);
}