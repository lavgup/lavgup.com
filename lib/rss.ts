#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import { writeFileSync } from 'fs';
import RSS from 'rss';
import { getPosts } from './notion';

async function generate() {
    const feed = new RSS({
        title: 'Lav',
        site_url: 'https://lavya.me',
        feed_url: 'https://lavya.me/feed.xml'
    });

    const posts = await getPosts(process.env.NOTION_BLOG_ID as string);

    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `https://lavya.me/blog/${post.slug}`,
            date: post.publishedAt
        });
    });

    writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate().then(() => console.log('Generated RSS feed!'));
