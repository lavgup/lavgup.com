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
			className="w-full mb-3 hover:shadow"
			href={href}
			aria-label={title}
			target="_blank"
			rel={'noopener noreferrer'}
		>
			<div className="items-center p-4 border border-gray-300 rounded dark:border-gray-800">
				<div className="flex flex-row align-middle">
					<h3 className="text-lg font-semibold tracking-tight text-gray-900 leading-6 dark:text-gray-100">
						{title}
					</h3>
					<span className="ml-1">
						<Tag tag={tag} small />
					</span>
				</div>
				<p className="text-gray-700 leading-5 dark:text-gray-300">
					{description}
				</p>
			</div>
		</a>
	);
}
