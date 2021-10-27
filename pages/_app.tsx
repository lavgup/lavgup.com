import { ThemeProvider } from 'next-themes';

import 'styles/globals.css';
import { usePanelbear } from 'lib/analytics';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
	usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID as string, {
		scriptSrc: '/bear.js',
		debug: false
	});

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
