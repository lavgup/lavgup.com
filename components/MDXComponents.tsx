import Link from 'next/link';
import ImageWithBlur from 'components/ImageWithBlur';
import { AnchorHTMLAttributes } from 'react';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} />
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const MDXComponents = {
    Image: ImageWithBlur,
    a: CustomLink
};

export default MDXComponents;
