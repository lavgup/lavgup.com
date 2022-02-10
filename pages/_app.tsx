import 'styles/globals.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import CommandPalette from '../components/CommandPalette';
import { Toaster } from 'react-hot-toast';
import { useAnalytics } from '../lib/analytics';

export default function MyApp({ Component, pageProps }: AppProps) {
    useAnalytics();

    return (
        <ThemeProvider attribute="class">
            <CommandPalette>
                <Component {...pageProps} />
                <Toaster position="bottom-right" />
            </CommandPalette>
        </ThemeProvider>
    );
}
