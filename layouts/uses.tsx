import Container from 'components/Container';
import { ReactNode } from 'react';

export default function UsesLayout({ children }: { children: ReactNode }) {
	return (
		<Container
			title='Uses - Lav'
			description="What I'm using regularly for productivity, schoolwork and programming."
		>
			<article className='flex flex-col items-start justify-center max-w-4xl mx-auto mb-16'>
				<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
					My setup
				</h1>
				<p className='prose dark:prose-dark'>
					{children}
				</p>
			</article>
		</Container>
	);
}
