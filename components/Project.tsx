import Tag from './Tag';

interface Project {
	title: string,
	description: string,
	tag: string,
	href: string
}

export default function Project({ title, description, tag, href }: Project) {
	return (
		<a
			className="mb-3 w-full hover:shadow"
			href={href}
			aria-label={title}
			target="_blank"
			rel={'noopener noreferrer'}
		>
			<div className="items-center border border-gray-300 dark:border-gray-800 rounded p-4">
				<div className="flex justify-start items-start">
					<h3 className="leading-6 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
						{title}
					</h3>
					<span className="ml-1">
						<Tag tag={tag} small />
					</span>
				</div>
				<p className="leading-5 text-gray-700 dark:text-gray-300">
					{description}
				</p>
			</div>
		</a>
	);
}
