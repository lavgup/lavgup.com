import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';

export default function Container(props) {
	const { children, ...customMeta } = props;
	const router = useRouter();
	const meta = {
		title: 'Lav Gup - Aussie student',
		description: 'Australian student with a passion to learn and explore the world-wide web.',
		image: 'https://lavya.tech/static/banner.png',
		type: 'website',
		...customMeta
	};

	return (
		<div>
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={`https://lavya.tech${router.asPath}`} />
				<link rel="canonical" href={`https://lavya.tech${router.asPath}`} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Lavya Gupta" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@lavxgup" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
				{meta.date && (
					<meta property="article:published_time" content={meta.date} />
				)}
			</Head>


			<main className="flex flex-col min-h-screen px-8">
				<Nav />
				<div className="flex-auto">
					{children}
				</div>
				<Footer />
			</main>
		</div>
	)
}