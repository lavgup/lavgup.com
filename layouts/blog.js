import React from 'react';
import { format, parseISO } from 'date-fns';
import Container from '../components/Container';
import Tag from '../components/Tag';

export default function BlogLayout({ children, frontMatter }) {

	return (
		<Container
			title={`${frontMatter.title} - Lav`}
			description={frontMatter.description}
			image={`https://lavya.me/static/images/${frontMatter.slug}/${frontMatter.image}`}
			date={new Date(frontMatter.publishedAt).toISOString()}
			type='article'
		>
			<article className='flex flex-col justify-center items-start max-w-4xl mx-auto mb-16 w-full'>
				<h1 className='font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white'>
					{frontMatter.title}
				</h1>
				<p className='text-sm text-gray-700 dark:text-gray-300'>
					{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
				</p>
				<p className='text-sm text-gray-400 min-w-32 mt-3 md:mt-1'>
					{frontMatter.readingTime.text}
				</p>
				<div className='flex justify-start mt-3'>
					{frontMatter.tags.map(tag => (
						<Tag key={tag} tag={tag} />
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
