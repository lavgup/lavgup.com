import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export const Text = ({
                         text,
                         className = []
                     }: {
    text: any[];
    className?: string[];
}) => {
    if (!text) return null;

    return (
        <>
            {text.map((value, idx) => {
                const {
                    annotations: {
                        bold,
                        color,
                        italic,
                        strikethrough,
                        underline,
                        code
                    },
                    text: { content, link }
                } = value;

                const text = (
                    <span
                        key={idx}
                        className={[
                            ...className,
                            bold ? 'font-semibold' : '',
                            italic ? 'italic' : '',
                            strikethrough ? 'line-through' : '',
                            underline ? 'underline' : ''
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        style={color !== 'default' ? { color } : {}}
                    >
                        {link ? <a href={link.url}>{content}</a> : content}
                    </span>
                );

                if (code)
                    return (
                        <code key={idx} className='text-pink-400/90'>
                            {content}
                        </code>
                    );
                else return text;
            })}
        </>
    );
};

export function renderBlock(block: any) {
    const { type, id } = block;

    switch (type) {
        case 'paragraph':
            return (
                <p className='mt-4'>
                    <Text
                        className={['prose', 'dark:prose-dark']}
                        text={block.paragraph.text}
                    />
                </p>
            );
        case 'heading_1':
            return (
                <h1>
                    <Text
                        className={['font-bold', 'text-3xl']}
                        text={block.heading_1.text}
                    />
                </h1>
            );
        case 'heading_2':
            return (
                <h2
                    id={block.heading_2.text[0].plain_text
                        .toLowerCase()
                        .replace(' ', '-')}
                    className='mt-10'
                >
                    <Text
                        className={['font-bold', 'text-2xl']}
                        text={block.heading_2.text}
                    />
                </h2>
            );
        case 'heading_3':
            return (
                <h3>
                    <Text
                        className={['font-bold', 'text-xl']}
                        text={block.heading_3.text}
                    />
                </h3>
            );
        case 'bulleted_list_item':
            return (
                <li>
                    <Text text={block.bulleted_list_item.text} />
                </li>
            );
        case 'numbered_list_item':
            return (
                <li>
                    <Text text={block.numbered_list_item.text} />
                </li>
            );
        case 'to_do':
            return (
                <div>
                    <label htmlFor={id}>
                        <input
                            type='checkbox'
                            id={id}
                            defaultChecked={block.to_do.checked}
                        />{' '}
                        <Text text={block.to_do.text} />
                    </label>
                </div>
            );
        case 'child_page':
            return <p>{block.child_page.title}</p>;
        case 'image': {
            const image = block.image;

            const regex = /\bhttps?:\/\/\S+/gi;

            const src =
                image.type === 'external' ? image.external.url : image.file.url;
            const caption =
                image.caption?.[0]?.plain_text.replace(regex, '') || '';

            return (
                <figure>
                    <BlurImage
                        src={src}
                        alt={caption}
                        width={800}
                        height={500}
                        priority
                        className='rounded-md mt-6 w-full'
                    />
                    {caption && (
                        <figcaption className='text-sm text-neutral-600/90 dark:text-neutral-300 pt-2'>
                            {caption}
                        </figcaption>
                    )}
                </figure>
            );
        }
        case 'divider':
            return <hr key={id} />;
        case 'quote':
            return (
                <blockquote key={id}>
                    {block.quote.text[0].plain_text}
                </blockquote>
            );
        default:
            return <></>;
    }
}

function BlurImage({ ...props }) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            {...props}
            src={props.src}
            className={clsx(
                props.className,
                'duration-700 ease-in-out',
                isLoading
                    ? 'grayscale blur-2xl scale-110'
                    : 'grayscale-0 blur-0 scale-100'
            )}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}
