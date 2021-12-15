import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';

type Block = ListBlockChildrenResponse['results'][number];
type Unpacked<T> = T extends (infer U)[] ? U : T;

export type BlockType = Block['type'];

export type ExtractedBlockType<TType extends BlockType> = Extract<
	Block,
	{ type: TType }
	>;

export const Text = ({ text, className = [] }: {
	// @ts-ignore
	text: ExtractedBlockType<BlockType>[BlockType]['text'][number],
	className?: string[]
}) => {
	if (!text) return null;

	const {
		annotations: { bold, color, italic, strikethrough, underline },
		text: { content, link }
	} = text;

	return (
		<span
			className={[
				bold ? 'font-bold' : '',
				italic ? 'italic' : '',
				strikethrough ? 'line-through' : '',
				underline ? 'underline' : '',
				...className
			].join(' ')}
			style={color !== 'default' ? { color } : {}}
		>
        {link ? <a href={link.url}>{content}</a> : content}
      </span>
	);
};

export function renderBlock(block: Unpacked<Block>) {
	const { type, id } = block;

	switch (type) {
		case 'paragraph':
			return (
				<p className="mt-4">
					<Text
						className={['prose', 'dark:prose-dark', 'transition ease-in-out duration-500']}
						text={block.paragraph.text[0]}
					/>
				</p>
			);
		case 'heading_1':
			return (
				<h1>
					<Text
						className={['font-bold', 'text-3xl']}
						text={block.heading_1.text[0]}
					/>
				</h1>
			);
		case 'heading_2':
			return (
				<h2
					id={block.heading_2.text[0].plain_text.toLowerCase().replace(' ', '-')}
					className="mt-10"
				>
					<Text
						className={['font-bold', 'text-2xl']}
						text={block.heading_2.text[0]}
					/>
				</h2>
			);
		case 'heading_3':
			return (
				<h3>
					<Text
						className={['font-bold', 'text-xl']}
						text={block.heading_3.text[0]}
					/>
				</h3>
			);
		case 'bulleted_list_item':
			return (
				<li>
					<Text text={block.bulleted_list_item.text[0]} />
				</li>
			);
		case 'numbered_list_item':
			return (
				<li>
					<Text text={block.numbered_list_item.text[0]} />
				</li>
			);
		case 'to_do':
			return (
				<div>
					<label htmlFor={id}>
						<input type="checkbox" id={id} defaultChecked={block.to_do.checked} />{" "}
						<Text text={block.to_do.text} />
					</label>
				</div>
			);
		case 'child_page':
			return <p>{block.child_page.title}</p>;
		case 'image': {
			const image = block.image;

			const src =
				image.type === "external" ? image.external.url : image.file.url;
			const caption = image.caption ? image.caption[0].plain_text : "";

			return (
				<figure>
					<Image src={src} alt={caption} />
					{caption && <figcaption>{caption}</figcaption>}
				</figure>
			);
		}
		case 'divider':
			return <hr key={id} />;
		case 'quote':
			return <blockquote key={id}>{block.quote.text[0].plain_text}</blockquote>;
		default:
			return <></>;
	}
}
