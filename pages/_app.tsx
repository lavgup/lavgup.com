import 'styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import CommandPalette from '../components/CommandPalette';
import { Toaster } from 'react-hot-toast';
import { useAnalytics } from '../lib/analytics';

export default function MyApp({ Component, pageProps }: AppProps) {
	useAnalytics();

	return (
		<ThemeProvider attribute="class" enableColorScheme={false}>
			<CommandPalette>
				<Component {...pageProps} />
			</CommandPalette>
			<Toaster position="bottom-right" />
		</ThemeProvider>
	);
}
