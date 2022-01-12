import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getStaticProps } from '../pages/blog';
import Tag from './Tag';

export default function BlogCard({ post }: { post: InferGetStaticPropsType<typeof getStaticProps>['posts'][number] }) {
	const published = post.publishedAt;
	const formatted = new Date(published as string).toLocaleDateString('en-GB', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});

	return (
		<Link href={`/blog/${post.slug}`}>
			<a className="inline-block p-2.5 w-full rounded-md border-2 border md:p-3 border-orange-200/40 dark:border-orange-400/20">
				<div className="flex flex-col">
					<p className="text-lg font-bold transform-gpu">
						{post.title}
					</p>
					<p>
						{post.description}
					</p>

					<div className="text-[0.925rem] text-gray-700 dark:text-gray-300 mt-3">
						<ol className="flex flex-row gap-1">
							{post.tags.map((tag: string, idx: number) => (
								<li key={idx}>
									<Tag tag={tag} />
								</li>
							))}
						</ol>
						<p className="mt-3 text-sm">
							{formatted}
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
}
