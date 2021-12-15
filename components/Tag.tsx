import Link from 'next/link';

export default function Tag({ tag }: { tag: string }) {
	return (
		<Link href={`/blog/tag/${tag}`}>
			<a className="rounded rounded-md py-1 px-1.5 ease-in-out duration-500 text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:text-gray-900">
				{tag}
			</a>
		</Link>
	);
}
