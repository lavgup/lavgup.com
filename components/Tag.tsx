import Link from 'next/link';

export default function Tag({ tag }: { tag: string }) {
	return (
		<Link href={`/blog/tag/${tag}`}>
			<a className="rounded rounded-xl py-1 px-1.5 ease-in-out duration-500 bg-orange-200/60 text-orange-800/70 dark:bg-orange-500/20 dark:text-orange-400/[.65] hover:bg-orange-200/90 dark:hover:bg-orange-500/30">
				{tag}
			</a>
		</Link>
	);
}
