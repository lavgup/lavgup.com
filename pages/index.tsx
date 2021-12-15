import Container from 'components/Container';
import { InferGetStaticPropsType } from 'next';
import { getProjects } from '../lib/notion';

export default function Home({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Container rss>
			<div>
				<h2 className="text-4xl font-bold transform-gpu">
					Hi, I'm Lav.
				</h2>
				<p className="mt-4">
					I'm an Australian student, badminton player and hobby software developer.
					I'm currently working on multiple projects, but in my free time I enjoy exploring the web, writing,
					and enjoying time with friends and family.
				</p>

				<a
					href="mailto:lavyag01@gmail.com"
					className="mt-4 inline-block transition ease-in-out duration-400 px-2.5 py-1.5 rounded-lg text-orange-800/80 dark:text-orange-300/90 bg-orange-300/[.33] hover:bg-orange-400/[.33] dark:bg-orange-400/20 hover:dark:bg-orange-400/[.275]"
				>
					Contact me
				</a>
			</div>

			<div className="mt-10">
				<h2 className="text-2xl font-bold transform-gpu">
					Projects
				</h2>

				<div className="flex flex-col mt-2 gap-2">
					{projects.reverse().map((el, idx) => (
						<ProjectCard
							key={idx}
							project={el}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}

function ProjectCard({ project }: { project: InferGetStaticPropsType<typeof getStaticProps>['projects'][number] }) {
	return (
		<a
			href={project.url}
			className="w-full p-3 border border-2 border-orange-200/40 transition-all ease-in-out duration-500 dark:border-gray-700 rounded-md"
		>
			<h3 className="text-lg font-bold tracking-tighter">
				{project.name}
			</h3>
			<p className="mt-2 text-gray-700 dark:text-gray-200 transition ease-in-out duration-500">
				{project.description}
			</p>
		</a>
	);
}

export async function getStaticProps() {
	const projects = await getProjects(process.env.NOTION_PROJECTS_ID as string, 3);

	return {
		props: { projects }
	};
}
