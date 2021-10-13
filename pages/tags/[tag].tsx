import Container from 'components/Container';
import BlogPost from 'components/BlogPost';

import { allBlogs } from '.contentlayer/data';
import { Blog } from '.contentlayer/types';

export default function Tag(
	{ posts, tag }: {
		posts: Blog[],
		tag: string
	}
) {
	const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);

	return (
		<Container
			title={`${tag} - Lav`}
			description={`See all posts filtered under the ${tag} tag.`}
		>
			<div className='flex flex-col items-start justify-center max-w-4xl mx-auto mb-16'>
				<h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
					{title}
				</h1>
				<h2 className='mt-6 text-2xl font-bold tracking-tight md:text-4xl'>
					All posts
				</h2>
				<hr className='w-full mt-4 mb-8 border-gray-200 border-1 dark:border-gray-800' />
				{posts.map(post => (
					<BlogPost key={post.title} {...post} />
				))}
			</div>
		</Container>
	);
}

interface Params {
	params: { tag: string }
}

export async function getStaticPaths() {
	const tags: string[] = [];
	allBlogs.forEach(post =>
		tags.push(...post.tags)
	);

	return {
		paths: [...new Set(tags)].map(tag => ({
			params: {
				tag: tag
			}
		})),
		fallback: false
	};
}

export async function getStaticProps({ params }: Params) {
	const filteredPosts = allBlogs.filter(
		post => post.tags.map(t => t.includes(params.tag))
	);

	return { props: { posts: filteredPosts, tag: params.tag } };
}
