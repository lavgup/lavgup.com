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
			<article className='flex flex-col justify-center items-start max-w-4xl mx-auto mb-16 w-full'>
				<h1 className='font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white'>
					{post.title}
				</h1>
				<p className='text-sm text-gray-700 dark:text-gray-300'>
					{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
				</p>
				<p className='text-sm text-gray-400 min-w-32 mt-3 md:mt-1'>
					{post.readingTime.text}
				</p>
				<div className='flex justify-start mt-3'>
					{post.tags.map(tag => (
						<Tag key={tag} tag={tag} href={`/tags/${tag}`} />
					))}
				</div>
				<hr className='w-full border-1 border-gray-200 dark:border-gray-800 mt-6' />
				<div className='prose dark:prose-dark dark:text-gray-400 max-w-none w-full'>
					{children}
				</div>
			</article>
		</Container>
	);
}
