import { Client } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { ExtractedPropertyValue } from '../utils';

type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;

export const notion = new Client({
	auth: process.env.NOTION_TOKEN
});

export async function getDatabase(id: string, sorts?: QueryDatabaseParameters['sorts']) {
	const response = await notion.databases.query({
		database_id: id,
		sorts
	});

	return response.results;
}

export async function getPage(slug: string, databaseId: string) {
	const res = await getDatabase(databaseId);
	// @ts-ignore
	return res.filter(r => r.properties.Slug.rich_text[0].plain_text)[0];
}

export async function getBlocks(id: string) {
	const response = await notion.blocks.children.list({
		block_id: id,
		page_size: 50
	});

	return response.results;
}

export async function getPosts<T extends number>(databaseId: string, limit?: Integer<T>) {
	const database = await getDatabase(databaseId);

	const pages = database.map((page: any) => ({
		title: (page.properties.Title as ExtractedPropertyValue<'title'>).title[0].plain_text,
		description: (page.properties.Description as ExtractedPropertyValue<'rich_text'>).rich_text[0].plain_text,
		tags: (page.properties.Tags as ExtractedPropertyValue<'multi_select'>).multi_select.map((t: any) => t.name),
		slug: (page.properties.Slug as ExtractedPropertyValue<'rich_text'>).rich_text[0].plain_text,
		publishedAt: (page.properties['Published At'] as ExtractedPropertyValue<'date'>).date?.start as string
	}));

	return (limit && limit > 0)
		? pages.splice(0, limit)
		: pages;
}

export async function getProjects<T extends number>(databaseId: string, limit?: Integer<T>) {
	const database = await getDatabase(databaseId);

	const pages = database.map((page: any) => ({
		name: (page.properties.Name as ExtractedPropertyValue<'title'>).title[0].plain_text,
		description: (page.properties.Description as ExtractedPropertyValue<'rich_text'>).rich_text[0].plain_text,
		url: (page.properties.URL as ExtractedPropertyValue<'url'>).url as string,
		tags: (page.properties.Tags as ExtractedPropertyValue<'multi_select'>).multi_select.map((t: any) => t.name),
	}));

	return (limit && limit > 0)
		? pages.splice(0, limit)
		: pages;
}

export async function getStack(databaseId: string) {
	const database = await getDatabase(databaseId, [{
		property: 'Tags',
		direction: 'ascending'
	}, {
		property: 'Order',
		direction: 'ascending'
	}]);

	return database.map((page: any) => ({
		name: (page.properties.Name as ExtractedPropertyValue<'title'>).title[0].plain_text,
		tags: (page.properties.Tags as ExtractedPropertyValue<'multi_select'>).multi_select.map((t: any) => t.name),
		url: (page.properties.URL as ExtractedPropertyValue<'url'>).url,
	}));
}

export async function getWords(databaseId: string) {
	const database = await getDatabase(databaseId);

	return database.map((page: any) => ({
		name: (page.properties.Name as ExtractedPropertyValue<'title'>).title[0].plain_text,
		type: (page.properties.Type as ExtractedPropertyValue<'select'>).select?.name as string,
		definition: (page.properties.Definition as ExtractedPropertyValue<'rich_text'>).rich_text[0].plain_text
	}));
}
