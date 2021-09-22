import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getFiles, getFileBySlug } from 'lib/mdx';
import MDXComponents from 'components/MDXComponents';
import BlogLayout from 'layouts/blog';
import { FrontMatter } from "lib/types";

interface Blog {
	code: string,
	frontMatter: FrontMatter
}

export default function Blog({ code, frontMatter }: Blog) {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	return (
		<BlogLayout frontMatter={frontMatter}>
			<Component
				// @ts-ignore
				components={MDXComponents}
			/>
		</BlogLayout>
	);
}

export async function getStaticPaths() {
	const posts = getFiles();

	return {
		paths: posts.map(p => ({
			params: {
				slug: p.replace('.mdx', '')
			}
		})),
		fallback: false
	};
}

interface Params {
	params: { slug: string }
}

export async function getStaticProps({ params }: Params) {
	const post = await getFileBySlug('blog', params.slug);

	return { props: post };
}
