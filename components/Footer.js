import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default function Footer() {
	const year = new Date().getFullYear();
	const isDev = process.env.NODE_ENV === 'development';

	let data;

	// Don't request quote in development
	// I don't want to spam requests while
	// I'm making changes to my code
	if (!isDev) data = useSWR('/api/quote', fetcher, { revalidateOnFocus: false }).data;

	return (
		<footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
			<hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
			<div className="flex justify-between w-full text-gray-600 dark:text-gray-400">
				<p>
					{data?.quote ? `"${data.quote}"` : `Copyright © ${year} Lav`}
				</p>
				<div className="flex flex-row">
					<ul className="col-4 col-sm-4 col-lg-4 col-xl-3 list-style-none pl-4">
						<li>
							<a href="https://github.com/lavgup">
								GitHub
							</a>
						</li>
						<li>
							<a href="https://discord.com/invite/3hsdQhYVKT">
								Discord
							</a>
						</li>
					</ul>
					<ul className="col-4 col-sm-4 col-lg-4 col-xl-3 list-style-none pl-4">
						<li>
							<a href="https://twitter.com/lavxgup">
								Twitter
							</a>
						</li>
						<li>
							<a href="mailto:lavyag01@gmail.com">
								Email
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}