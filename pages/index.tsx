import Container from 'components/Container';
import Project from 'components/Project';

export default function Home() {
	return (
		<Container>
			<div className='flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16'>
					<h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
						Hi. I&apos;m Lav.
					</h1>
					<p className='w-full mt-2 text-gray-600 max-w-none prose dark:prose-dark dark:text-gray-400'>
						I&apos;m an Australian student, badminton player and a hobby software developer.
						When I&apos;m not off at school or smashing shuttles on the court, I&apos;m exploring the worldwide web
						and creating all sorts of stuff.
					</p>

					<button>
						<a
							href='mailto:lavyag01@gmail.com'
							className='block pt-2 pb-2 pl-3 pr-3 mt-10 border-2 border-solid border-gray-300 rounded-md dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-900'
						>
							<p>Get in Touch</p>
						</a>
					</button>

				<h2 className='mt-20 mb-6 text-2xl font-bold tracking-tight md:text-4xl'>
					Projects
				</h2>
				<Project
					title='Wiki Utilities'
					description='Discord bot for taking administrative actions on a wiki through Discord. Delete, protect, edit pages.'
					href='https://github.com/lavgup/wiki-utilities'
					tag='bot'
				/>
				<Project
					title='mediawiki.js'
					description='A simplistic client library in TypeScript for the MediaWiki API, compiled for use in Node programs.'
					href='https://github.com/lavgup/mediawiki.js'
					tag='wrapper'
				/>
				<Project
					title='alexflipnote.go'
					description='A modern and fast wrapper for the AlexFlipnote API in Go. Includes easy token authentication.'
					href='https://github.com/lavgup/alexflipnote.go'
					tag='wrapper'
				/>
			</div>
		</Container>
	);
}
