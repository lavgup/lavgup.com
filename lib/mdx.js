import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import MDXComponents from '../components/MDXComponents';
import readingTime from 'reading-time';
import mdxPrism from 'mdx-prism';
import renderToString from 'next-mdx-remote/render-to-string';

const root = process.cwd();

/**
 * Gets all files in the blog directory.
 * @returns {string[]}
 */
export function getFiles() {
    return readdirSync(join(root, 'content', 'blog'));
}

/**
 * Gets a file based on its slug.
 * @param slug
 */
export async function getFileBySlug(slug) {
    const source = readFileSync(join(root, 'content', 'blog', `${slug}.mdx`), 'utf8');

    const { data, content } = matter(source);
    const mdxSource = await renderToString(content, {
        components: MDXComponents,
        mdxOptions: {
            remarkPlugins: [
                require('remark-autolink-headings'),
                require('remark-slug'),
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
            join(root, 'content', 'blog', postSlug),
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

