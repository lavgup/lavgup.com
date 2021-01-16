import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

function BlogSeo({ title, description, publishedAt, url }) {
    const date = new Date(publishedAt).toISOString();

    return (
        <>
            <NextSeo
                title={`${title} – Lav`}
                description={description}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: date
                    },
                    url,
                    title,
                    description
                }}
            />
            <ArticleJsonLd
                authorName="Lav"
                dateModified={date}
                datePublished={date}
                description={description}
                publisherLogo="/static/llama.png"
                publisherName="Lav"
                title={title}
                url={url}
            />
        </>
    )
}

export default BlogSeo;