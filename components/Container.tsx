import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';

interface Props {
    children: ReactNode;
    title?: string;
    description?: string;
    image?: string;
    date?: string;
    type?: string;
    rss?: boolean;
}

export default function Container(props: Props) {
    const { children, ...customMeta } = props;
    const router = useRouter();
    const meta = {
        title: 'Lav Gup - Aussie student',
        description:
            'Australian student with a passion to learn and explore the world-wide web.',
        image: 'https://lavya.me/static/banner.png',
        type: 'website',
        ...customMeta
    };

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta
                    property="og:url"
                    content={`https://lavya.me${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://lavya.me${router.asPath}`}
                />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Lavya Gupta" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@lavgup" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && (
                    <meta
                        property="article:published_time"
                        content={meta.date}
                    />
                )}

                {/* Only expose RSS feed to relevant pages (home, blog, blog/* etc.) */}
                {props.rss && (
                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title="Lav"
                        href="/feed.xml"
                    />
                )}
            </Head>

            <div className="flex flex-col min-h-screen h-max">
                <Nav />

                <main className="flex-grow w-full max-w-4xl px-4 mx-auto">
                    {children}

                    <Footer />
                </main>
            </div>
        </div>
    );
}
