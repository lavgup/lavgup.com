import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';

const root = process.cwd();

/**
 * Gets all files in the blog directory.
 * @returns {string[]}
 */
export function getFiles() {
    return readdirSync(join(root, 'data', 'blog'));
}

/**
 * Gets a file based on its slug.
 * @param type The type of the file
 * @param slug The slug of the file, if existent
 */
export async function getFileBySlug(type, slug) {
    const source = slug
        ? readFileSync(join(root, 'data', type, `${slug}.mdx`), 'utf8')
        : readFileSync(join(root, 'data', `${type}.mdx`), 'utf8');

    const { data, content } = matter(source);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                require('remark-slug'),
                [
                    require('remark-autolink-headings'),
                    {
                        linkProperties: {
                            className: ['anchor']
                        }
                    }
                ],
                require('remark-code-titles')
            ],
            rehypePlugins: [mdxPrism]
        }
    });

    return {
        mdxSource,
        frontMatter: {
            wordCount: content.split(/\s+/gu).length,
            readingTime: readingTime(content),
            slug: slug || null,
            ...data
        }
    };
}

/**
 * Gets all files' front matter.
 * @returns {*[]}
 */
export function getAllFrontMatter() {
    const files = getFiles();

    return files.reduce((allPosts, postSlug) => {
        const source = readFileSync(
            join(root, 'data', 'blog', postSlug),
            'utf8'
        );
        const { data } = matter(source);

        return [
            {
                ...data,
                slug: postSlug.replace('.mdx', '')
            },
            ...allPosts
        ];
    }, []);
}

export async function getAllTags() {
    const files = await getAllFrontMatter();

    const tags = [];

    files.map(file => {
        file.tags.map(tag => tags.push(tag));
    });

    return tags;
}

