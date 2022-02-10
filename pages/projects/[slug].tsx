import { getBlocks, getPage, getProjects } from '../../lib/notion';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import Container from '../../components/Container';
import { ExternalLinkIcon, GitHubAltIcon } from '../../components/icons';
import { Fragment } from 'react';
import { renderBlock } from '../../lib/notion/renderer';

export default function Project({
    page,
    blocks
}: {
    page: any;
    blocks: ListBlockChildrenResponse['results'];
}) {
    if (!page || !blocks) return null;

    const title = page.properties.Name.title[0].plain_text;
    const description = page.properties.Description.rich_text[0].plain_text;
    const type = page.properties.Type.select;
    const stack = page.properties.Stack.multi_select.map((s: any) => s.name);
    const source = page.properties.Source.url;
    const link = page.properties.Link.url;

    return (
        <Container title={`${title} - Lav`} description={description}>
            <div className="flex flex-row items-center gap-3">
                <h1 className="text-4xl font-bold">{title}</h1>
                <div
                    className={`mt-0.5 pt-[.08rem] pb-[.23rem] px-1.5 bg-blue-300/60 dark:bg-blue-500/40 rounded-lg text-sm`}
                >
                    <p className="text-blue-700/90 dark:text-blue-300">
                        {type.name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 mt-3">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <ul className="flex flex-row gap-1.5">
                            {stack.map((s: any, idx: number) => (
                                <li
                                    key={idx}
                                    className="text-sm bg-red-300/60 text-red-800/80 dark:text-red-300/90 dark:bg-red-400/30 rounded-md py-[.15rem] px-[.45rem] mt-1 w-fit"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-row mt-2 gap-2 mb-2">
                        {source && (
                            <a
                                href={source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 w-fit rounded-lg bg-neutral-300/80 dark:bg-neutral-700/[.55] dark:text-neutral-100/80 px-2 py-1.5"
                            >
                                <GitHubAltIcon className="w-h h-5" />
                                <p className="text-xs">Open in GitHub</p>
                            </a>
                        )}

                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 w-fit rounded-lg bg-neutral-300/80 dark:bg-neutral-700/[.55] dark:text-neutral-100/80 px-2 py-1.5"
                            >
                                <ExternalLinkIcon className="w-h h-5" />
                                <p className="text-xs">View Project</p>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div>
                {blocks.map((block) => (
                    <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
            </div>
        </Container>
    );
}

export async function getStaticPaths() {
    const projects = await getProjects(
        process.env.NOTION_PROJECTS_ID as string
    );

    return {
        paths: projects.map((project) => ({
            params: { slug: project.slug }
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
        process.env.NOTION_PROJECTS_ID as string
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
            );
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
