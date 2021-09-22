import classNames from 'classnames';
import Link from 'next/link';

export default function Tag(
	{ tag, small = false, href }: {
		tag: string,
		small?: boolean,
		href?: string
	}
) {
	const className = classNames('rounded-md text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 mr-1', {
		'text-sm px-1 px-1.5': small,
		'px-2': !small
	});

	const body = (
		<div className={className}>
			{tag}
		</div>
	);

	if (href) {
		return (
			<Link href={href}>
				<a>
					{body}
				</a>
			</Link>
		);
	} else return body;
}
