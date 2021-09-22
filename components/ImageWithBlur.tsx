import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function ImageWithBlur(props: ImageProps) {
	const [isLoading, setLoading] = useState(true);

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			{...props}
			className={classNames(
				props.className as string,
				isLoading
					? 'grayscale duration-300 ease-in-out blur-md'
					: 'grayscale-0 duration-300 ease-in-out blur-0'
			)}
			onLoadingComplete={() => setLoading(false)}
		/>
	);
}
