import Link from 'next/link';
import LeftArrow from './icons/LeftArrow';

export default function BackArrow({ href, text }: { href: string, text: string }) {
	return (
		<Link href={href}>
			<a className="flex flex-row items-center mb-1 text-sm hover:text-gray-400 dark:hover:text-gray-300">
				<LeftArrow className="mt-0.5 mr-1 w-5 h-5" />
				{text}
			</a>
		</Link>
	);
}
