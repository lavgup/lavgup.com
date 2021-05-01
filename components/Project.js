import React from 'react';

export default function Project({ title, description, tag, href }) {
	return (
		<a
			className="mb-3 w-full hover:shadow"
			href={href}
			aria-label={title}
			target="_blank"
			rel={"noopener noreferrer"}
		>
			<div className="items-center border border-gray-200 dark:border-gray-800 rounded p-4">
				<div className="flex justify-start items-start">
					<h3 className="leading-6 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
						{title}
					</h3>
					<div
						className="rounded text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 px-1 ml-2">
						<p className="text-sm">
							{tag}
						</p>
					</div>
				</div>
				<p className="leading-5 text-gray-700 dark:text-gray-300">
					{description}
				</p>
			</div>
		</a>
	);
}