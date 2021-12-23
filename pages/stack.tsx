import { getStack } from '../lib/notion';
import { InferGetStaticPropsType } from 'next';
import Container from '../components/Container';
import Image from 'next/image';

import DesktopHardware from '../public/static/images/DeskSetup.png';

type StackType = InferGetStaticPropsType<typeof getStaticProps>['stack'];

interface Categories {
	hardware: Record<string, StackType>,
	software: Record<string, StackType>
}

export default function Stack({ stack }: { stack: StackType }) {
	const hardware = stack.filter(s => s.tags.includes('hardware'));
	const software = stack.filter(s => s.tags.includes('software'));

	const categories: Categories = {
		hardware: {},
		software: {}
	};

	[
		{ current: hardware, string: 'hardware' },
		{ current: software, string: 'software' }
	].forEach(({ current, string }) => {
		current.forEach(el => {
			el.tags.forEach(tag => {
				if (tag === string) return;
				categories[string as 'hardware' | 'software'][tag] = [
					...(categories[string as 'hardware' | 'software'][tag] || []),
					el
				];
			});
		});
	});

	return (
		<Container
			title="Stack - Lav"
			description="The software and hardware I use on a regular basis."
		>
			<h1 className="text-4xl font-bold tracking-tight">
				Stack
			</h1>
			<p className="mt-3 mb-10">
				The software and hardware I use on a regular basis.
			</p>

			<Image
				src={DesktopHardware}
				className="transition-all rounded-md duration-200"
				placeholder="blur"
				alt="Hardware stack"
				width="500"
				height="400"
				priority
			/>

			<div className="left-0 mt-16 grid grid-cols-1 md:grid-cols-2">
				<div className="px-2 py-2 border-b md:border-b-0 md:border-r-2 dark:border-neutral-500 md:px-0">
					<h2 className="mb-2 text-3xl font-bold">
						Software
					</h2>

					<div>
						{Object.keys(categories.software).reverse().map((el, idx) => {
							return <Category
								name={el}
								key={idx}
								obj={categories.software[el]}
							/>;
						})}
					</div>
				</div>

				<div className="px-2 py-2 mt-4 ml-0 md:ml-16 md:px-0 md:mt-0">
					<h2 className="flex items-center justify-start text-3xl font-bold">
						Hardware
					</h2>

					<div className="flex flex-col justify-start mt-2">
						{Object.keys(categories.hardware).reverse().map((el, idx) => {
							return <Category
								name={el}
								key={idx}
								obj={categories.hardware[el]}
							/>;
						})}
					</div>
				</div>
			</div>
		</Container>
	);
}

function Category({ name, obj }: { name: string, obj: StackType }) {
	return (
		<div
			className="flex flex-col mb-7"
		>
			<h3 className="mb-1.5 text-xl font-bold tracking-tight capitalize">
				{name}
			</h3>
			<ul className="flex flex-col gap-2">
				{obj.map(e => (
					<li key={e.name}>
						<a
							href={e.url as string}
							target="_blank"
							className="underline underline-offset-4
        decoration-orange-600 dark:decoration-orange-400 decoration-[0.25rem]
        motion-safe:transition-all motion-safe:duration-200
        hover:text-gray-500 dark:hover:text-neutral-300
        focus:decoration-[0.5rem] hover:decoration-orange-600/50 dark:hover:decoration-orange-400/[.725] focus:decoration-yellow-500/50"
							rel="noopener noreferrer"
						>
							{e.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const stack = await getStack(process.env.NOTION_STACK_ID as string);

	return {
		props: {
			stack
		},
		revalidate: 60
	};
}
