import hydrate from 'next-mdx-remote/hydrate';

import { getFiles, getFileBySlug } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';
import BlogLayout from '../../layouts/blog';

export default function Blog({ mdxSource, frontMatter }) {
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });

    return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export async function getStaticPaths() {
    const posts = await getFiles();

    return {
        paths: posts.map(p => ({
            params: {
                slug: p.replace('.mdx', '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const post = await getFileBySlug(params.slug);

    return { props: post };
}