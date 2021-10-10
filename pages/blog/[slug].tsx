import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import MDXComponents from 'components/MDXComponents';
import BlogLayout from 'layouts/blog';

import { allBlogs } from '.contentlayer/data';
import type { Blog } from '.contentlayer/types';

export default function BlogPost(post: Blog) {
	const Component = useMemo(
		() => getMDXComponent(post.body.code),
		[post.body.code]
	);

	if (!post) return null;

	return (
		<BlogLayout post={post}>
			<Component
				// @ts-ignore
				components={MDXComponents}
			/>
		</BlogLayout>
	);
}

export async function getStaticPaths() {
	return {
		paths: allBlogs.map(p => ({ params: { slug: p.slug } })),
		fallback: false
	};
}

interface Params {
	params: { slug: string }
}

export async function getStaticProps({ params }: Params) {
	const post = allBlogs.find(post => post.slug === params.slug);

	return { props: post };
}
