import { Client } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { ExtractedPropertyValue } from '../utils';

type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

export async function getDatabase(
    id: string,
    sorts?: QueryDatabaseParameters['sorts']
) {
    const response = await notion.databases.query({
        database_id: id,
        sorts
    });

    return response.results;
}

export async function getPage(slug: string, databaseId: string) {
    const res = await getDatabase(databaseId);

    return res.find(
        (r: any) => r.properties.Slug.rich_text[0].plain_text === slug
    );
}

export async function getBlocks(id: string) {
    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 50
    });

    return response.results;
}

export async function getPosts<T extends number>(
    databaseId: string,
    limit?: Integer<T>
) {
    const database = await getDatabase(databaseId);

    const pages = database.map((page: any) => ({
        title: page.properties.Title.title[0].plain_text,
        description: page.properties.Description.rich_text[0].plain_text,
        tags: page.properties.Tags.multi_select.map((t: any) => t.name),
        slug: page.properties.Slug.rich_text[0].plain_text,
        publishedAt: page.properties['Published At'].date?.start as string
    }));

    return limit && limit > 0 ? pages.splice(0, limit) : pages;
}

export async function getProjects<T extends number>(
    databaseId: string,
    limit?: Integer<T>
) {
    const database = await getDatabase(databaseId);

    const pages = database.map((page: any) => ({
        name: page.properties.Name.title[0].plain_text,
        description: page.properties.Description.rich_text[0].plain_text,
        source: page.properties.Source?.url as string,
        link: page.properties.Link?.url as string,
        type: page.properties.Type.select?.name as string,
        slug: page.properties.Slug.rich_text[0].plain_text
    }));

    return limit && limit > 0 ? pages.splice(0, limit) : pages;
}

export async function getStack(databaseId: string) {
    const database = await getDatabase(databaseId, [
        {
            property: 'Tags',
            direction: 'ascending'
        },
        {
            property: 'Order',
            direction: 'ascending'
        }
    ]);

    return database.map((page: any) => ({
        name: page.properties.Name.title[0].plain_text,
        tags: page.properties.Tags.multi_select.map((t: any) => t.name),
        url: page.properties.URL.url
    }));
}

export async function getWords(databaseId: string) {
    const database = await getDatabase(databaseId);

    return database.map((page: any) => ({
        name: page.properties.Name.title[0].plain_text,
        type: page.properties.Type.select?.name as string,
        definition: (
            page.properties.Definition as ExtractedPropertyValue<'rich_text'>
        ).rich_text[0].plain_text
    }));
}
