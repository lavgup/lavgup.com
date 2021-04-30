import Container from '../components/Container';
import React from 'react';

export default function UsesLayout({ children }) {
	return (
		<Container
			title="Uses - Lav"
			description="What I'm using regularly for productivity, schoolwork and programming."
		>
			<article className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					My setup
				</h1>
				<p className="prose dark:prose-dark">
					{children}
				</p>
			</article>
		</Container>
	);
}