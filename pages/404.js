import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/Container';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default function NotFound() {
	const { data } = useSWR('/api/status', fetcher);

	return (
		<Container title="404 - Lav">
			<div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					404
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					This page doesn't exist. You've either followed a link to a page that has since been deleted or misspelled the URL.
					Is the spelling 💯?
				</p>

				<Link href="/">
					<a className="p-1 sm:p-4 w-40 mb-8 font-bold bg-gray-200 dark:bg-gray-600 text-center rounded-md text-black dark:text-white">
						Go back home
					</a>
				</Link>

				<p className="text-gray-600 dark:text-gray-400 mb-8">
					For your entertainment, here's a random HTTP catus code.
				</p>
				<Image
					alt={`Image for HTTP status code ${data?.status || 404}`}
					src={`https://http.cat/${data?.status || 404}.jpg`}
					width={732}
					height={586}
				/>
			</div>
		</Container>
	);
}