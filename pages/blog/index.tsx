import Container from 'components/Container';

import { getPosts } from '../../lib/notion';
import { SearchIcon } from '../../components/icons';
import { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import BlogCard from '../../components/BlogCard';
import Tag from '../../components/Tag';

const description = 'Discussion on my personal thoughts, projects and hobbies.';

export interface BlogPost {
    title: string;
    description: string;
    tags: string[];
    slug: string;
    publishedAt: string;
}

export default function Blog({
                                 posts
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [searchValue, setSearchValue] = useState('');

    const tags = posts.map((p) => p.tags).flat();

    let sorted = posts.sort(
        (a, b) =>
            Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

    if (searchValue?.length) {
        sorted = sorted.filter((post) => {
            return post.title
                .toLowerCase()
                .includes(searchValue.toLowerCase().trim());
        });
    }

    return (
        <Container title='Blog - Lav' description={description} rss>
            <h1 className='text-4xl font-bold'>Blog</h1>
            <p className='mt-3'>
                Discussion on my personal thoughts, projects and hobbies.
            </p>

            <div className='relative items-center'>
                <SearchIcon
                    className='absolute text-gray-400 w-[1.15rem] h-[1.15rem] left-2 top-[1.275rem] dark:text-gray-300' />

                <input
                    type='search'
                    className='py-1 px-1.5 pl-8 mt-3 w-96 max-w-full bg-transparent rounded-md border border-md border-orange-200/40 dark:border-orange-400/20'
                    placeholder='Search'
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            <ol className='flex flex-row flex-wrap gap-2 mt-5'>
                {tags.map((el, idx) => (
                    <li key={idx}>
                        <Tag tag={el} />
                    </li>
                ))}
            </ol>

            <div className='flex flex-row items-baseline mt-10'>
                <h1 className='text-3xl font-bold'>All Posts</h1>
                <span className='text-lg font-bold ml-1.5 -translate-y-[.275rem]'>({sorted.length})</span>
            </div>
            <ol>
                {sorted.length > 0
                    ? sorted.map((post, idx) => (
                        <li key={idx} className='mt-3'>
                            <BlogCard post={post} />
                        </li>
                    ))
                    : <p className="text-md mt-2">There are no posts to display.</p>
                }
            </ol>
        </Container>
    );
}

export async function getStaticProps() {
    const pages = await getPosts(process.env.NOTION_BLOG_ID as string);

    return {
        props: {
            posts: pages
        },
        revalidate: 60
    };
}
