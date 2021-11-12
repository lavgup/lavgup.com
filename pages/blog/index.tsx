import Container from 'components/Container';
import { allBlogs } from '.contentlayer/data';
import { pick } from 'lib/utils';
import BlogPost from 'components/BlogPost';

import { Blog as BlogType } from '.contentlayer/types';

const description = 'Discussion on my personal thoughts, projects and hobbies.';

export default function Blog({ posts }: { posts: BlogType[] }) {
	const sortedBlogPosts = posts
		.sort((a, b) =>
			Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
		);

	return (
		<Container
			title='Blog - Lav'
			description={description}
		>
			<div className='max-w-4xl mx-auto'>
				<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
					Blog
				</h1>
				<p className='text-gray-600 dark:text-gray-400'>
					{`${description} This list is sorted from latest to oldest, top to bottom.`}
				</p>
				{sortedBlogPosts.length ?
					<h3 className='mt-10 mb-6 text-2xl font-bold tracking-tight text-black md:mt-20 md:text-4xl dark:text-white'>
						All Posts
					</h3>
					: <p className='mt-10 font-bold text-gray-600 dark:text-gray-400'>
						No posts.
					</p>
				}
				{sortedBlogPosts.map(post => (
					<BlogPost key={post.title} {...post} />
				))}
			</div>
		</Container>
	);
}

export async function getStaticProps() {
	const posts = allBlogs.map(post =>
		pick(post, ['slug', 'title', 'description', 'publishedAt', 'tags'])
	);

	return { props: { posts } };
}
