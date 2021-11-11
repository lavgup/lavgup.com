import Link from 'next/link';
import Tag from './Tag';

import type { Blog } from '.contentlayer/types';

export default function BlogPost({ title, description, slug, tags }: Blog) {
    return (
        <Link href={`/blog/${slug}`}>
            <a className="w-full">
                <div className="w-full mb-8">
                    <div className="flex flex-col justify-between md:flex-row">
                        <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
                            {title}
                        </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{description}</p>
	                <div className="flex justify-start mt-3">
		                {tags.map(tag => (
                                <Tag
                                    key={tag}
                                    tag={tag}
                                    href={`/tags/${tag}`}
                                />
		                ))}
	                </div>
                </div>
            </a>
        </Link>
    );
}
