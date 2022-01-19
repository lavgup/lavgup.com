import 'styles/globals.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import CommandPalette from '../components/CommandPalette';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class">
			<CommandPalette>
				<Component {...pageProps} />
				<Toaster position="bottom-right" />
			</CommandPalette>
		</ThemeProvider>
	);
}
