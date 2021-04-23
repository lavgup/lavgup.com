import Link from 'next/link';

export default function Tag({ tag }) {
	return (
		<Link href={`/tags/${tag}`}>
			<a>
				<div className="rounded-md text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 pl-1 pr-1 mr-1">
					{tag}
				</div>
			</a>
		</Link>
	);
}