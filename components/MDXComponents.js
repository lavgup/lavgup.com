import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CustomLink = props => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} />
            </Link>
        )
    }
}

const MDXComponents = {
    Image,
    a: CustomLink
};

export default MDXComponents;