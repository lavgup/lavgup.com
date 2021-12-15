import 'styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { usePanelbear } from 'lib/analytics';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }: AppProps) {
	usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID as string, {
		scriptSrc: '/bear.js',
		enabled: process.env.NODE_ENV === 'production',
		debug: false
	});

	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />

			<Toaster position="bottom-right" />
		</ThemeProvider>
	);
}
