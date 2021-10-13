import { format, parseISO } from 'date-fns';
import Container from 'components/Container';
import Tag from 'components/Tag';
import { PropsWithChildren } from 'react';
import type { Blog } from '.contentlayer/types';

export default function BlogLayout({ children, post }: PropsWithChildren<{ post: Blog }>) {
	return (
		<Container
			title={`${post.title} - Lav`}
			description={post.description}
			image={`https://lavya.me/static/images/${post.slug}/${post.image}`}
			date={new Date(post.publishedAt).toISOString()}
			type='article'
		>
			<article className='flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16'>
				<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
					{post.title}
				</h1>
				<p className='text-sm text-gray-700 dark:text-gray-300'>
					{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
				</p>
				<p className='mt-3 text-sm text-gray-400 min-w-32 md:mt-1'>
					{post.readingTime.text}
				</p>
				<div className='flex justify-start mt-3'>
					{post.tags.map(tag => (
						<Tag key={tag} tag={tag} href={`/tags/${tag}`} />
					))}
				</div>
				<hr className='w-full mt-6 border-gray-200 border-1 dark:border-gray-800' />
				<div className='w-full prose max-w-none dark:prose-dark dark:text-gray-400'>
					{children}
				</div>
			</article>
		</Container>
	);
}
