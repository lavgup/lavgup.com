import React from 'react';
import Link from 'next/link';
import Tag from './Tag';

export default function BlogPost({ title, description, slug, tags }) {
    return (
        <Link href={`/blog/${slug}`}>
            <a className="w-full">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
                            {title}
                        </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{description}</p>
	                <div className="flex justify-start mt-3">
		                {tags.map(tag => (
			                <Tag key={tag} tag={tag} />
		                ))}
	                </div>
                </div>
            </a>
        </Link>
    );
}