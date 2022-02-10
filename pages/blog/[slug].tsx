import { Fragment } from 'react';
import { getBlocks, getDatabase, getPage } from '../../lib/notion';
import { renderBlock } from '../../lib/notion/renderer';
import Container from '../../components/Container';
import { NotionIcon } from '../../components/icons';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import Backlink from '../../components/Backlink';

export default function BlogPost({
    page,
    blocks
}: {
    page: any;
    blocks: ListBlockChildrenResponse['results'];
}) {
    if (!page || !blocks) return null;

    const title = page.properties['Title'].title[0].plain_text;

    const published = page.properties['Published At'].date?.start;
    const formatted = new Date(published as string).toLocaleDateString(
        'en-GB',
        {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC'
        }
    );

    const notion = page.url.replace('www.notion.so', 'lavya.notion.site');

    return (
        <Container
            title={`${title} - Lav`}
            description={page.properties['Description'].rich_text[0].plain_text}
            rss
        >
            <Backlink href="/blog" text="All posts" />
            <div className="flex flex-row items-baseline mt-3">
                <h1 className="mb-3 text-3xl font-bold">{title}</h1>

                <a
                    href={notion}
                    target="_blank"
                    rel="noreferrer noopener"
                    title="Open in Notion"
                >
                    <NotionIcon className="ml-2.5 w-5 h-5" />
                </a>
            </div>

            <div className="flex flex-col text-[0.925rem] text-gray-700 dark:text-gray-300">
                <p>Published on {formatted}</p>
            </div>

            <div className="mt-10">
                {blocks.map((block) => (
                    <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
            </div>
        </Container>
    );
}

export async function getStaticPaths() {
    const database = await getDatabase(process.env.NOTION_BLOG_ID as string);

    return {
        paths: database.map((page: any) => ({
            params: {
                slug: page.properties.Slug.rich_text[0].plain_text
            }
        })),
        fallback: true
    };
}

interface Params {
    params: { slug: string };
}

export async function getStaticProps({ params }: Params) {
    const page = await getPage(
        params.slug,
        process.env.NOTION_BLOG_ID as string
    );
    if (!page) return;

    const blocks: any[] = await getBlocks(page.id);

    const childBlocks = await Promise.all(
        blocks
            .filter((block) => block.has_children)
            .map(async (block) => {
                return {
                    id: block.id,
                    children: await getBlocks(block.id)
                };
            })
    );

    const blocksWithChildren = blocks.map((block) => {
        if (block.has_children && !block[block.type].children) {
            block[block.type]['children'] = childBlocks.find(
                (x) => x.id === block.id
            )?.children;
        }

        return block;
    });

    return {
        props: {
            page,
            blocks: blocksWithChildren
        },
        revalidate: 60
    };
}
