import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import { FrontMatter } from "./types";

export function getFiles() {
    return readdirSync(join(process.cwd(), 'data', 'blog'));
}

export async function getFileBySlug(type: string, slug?: string) {
    const source = slug
        ? readFileSync(join(process.cwd(), 'data', type, `${slug}.mdx`), 'utf8')
        : readFileSync(join(process.cwd(), 'data', `${type}.mdx`), 'utf8');

    const { code, frontmatter } = await bundleMDX(source, {
        xdmOptions(options) {
            options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
            options.rehypePlugins = [
                ...(options?.rehypePlugins ?? []),
                rehypeSlug,
                rehypeCodeTitles,
                rehypePrism,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ['anchor']
                        }
                    }
                ]
            ];
            return options;
        }
    });

    return {
        code,
        frontMatter: {
            wordCount: source.split(/\s+/gu).length,
            readingTime: readingTime(source),
            slug: slug || null,
            ...frontmatter
        }
    };
}

type Mattered = FrontMatter & { slug: string };

export function getAllFrontMatter() {
    const files = getFiles();

    const collected: Mattered[] = [];

    for (const file of files) {
        const source = readFileSync(
            join(process.cwd(), 'data', 'blog', file)
        );
        const { data } = matter(source) as unknown as { data: FrontMatter };

        collected.push({
           ...data,
           slug: file.replace('.mdx', '')
        });
    }

    return collected;
}

export function getAllTags() {
    const files = getAllFrontMatter();

    const tags: string[] = [];

    files.map(file => {
        file.tags.map(tag => tags.push(tag));
    });

    return tags;
}
