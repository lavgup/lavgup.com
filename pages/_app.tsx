import 'atropos/css';
import 'styles/globals.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useAnalytics } from '../lib/analytics';
import { Inter } from '@next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

export default function MyApp({ Component, pageProps }: AppProps) {
    useAnalytics();

    return (
        <ThemeProvider attribute="class">
            <div className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}
