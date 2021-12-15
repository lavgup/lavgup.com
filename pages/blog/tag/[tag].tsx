import { getPosts } from '../../../lib/notion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Container from '../../../components/Container';
import { capitalise } from '../../../lib/utils';
import BlogCard from '../../../components/BlogCard';
import BackArrow from '../../../components/BackArrow';

export default function TagPage({ tag, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	const sorted = posts
		.sort((a, b) =>
			Number(new Date(b.publishedAt as string)) - Number(new Date(a.publishedAt as string))
		);

	return (
		<Container
			title={`${tag} - Lav`}
			description={`Posts tagged with ${tag}`}
		>
			<BackArrow href="/blog" text="All posts" />
			<h1 className="text-4xl font-bold tracking-tight">
				{tag}
			</h1>
			<p className="mt-4">
				{posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with {tag.toLowerCase()}.
			</p>

			<ol className="mt-10">
				{sorted.map((post, idx) => (
					<li key={idx} className="mt-3">
						<BlogCard post={post} />
					</li>
				))}
			</ol>
		</Container>
	);
}

export async function getStaticPaths() {
	const tags = (await getPosts(process.env.NOTION_BLOG_ID as string)).map(p => p.tags).flat();

	return {
		paths: tags.map(tag => ({
			params: {
				tag
			}
		})),
		fallback: false
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const posts = await getPosts(process.env.NOTION_BLOG_ID as string);

	return {
		props: {
			tag: capitalise(params?.tag as string),
			posts: posts.filter(p => p.tags.includes(params?.tag as string))
		},
		revalidate: 60
	};
}
