import { getWords } from '../lib/notion';
import { InferGetStaticPropsType } from 'next';
import Container from '../components/Container';

export default function Words({ words }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Container
			title="Words - Lav"
			description="Vocables I find intriguing"
		>
			<h1 className="text-4xl font-bold tracking-tight">
				Words
			</h1>
			<p className="mt-3">
				Vocables I find intriguing.
			</p>

			<div className="grid grid-cols-1 gap-2 mt-10 md:grid-cols-2">
				{words.map((word, idx) => (
					<Word
						key={idx}
						word={word}
					/>
				))}
			</div>
		</Container>
	);
}

function Word({ word }: { word: InferGetStaticPropsType<typeof getStaticProps>['words'][number] }) {
	return (
		<div
			key={word.name}
			onClick={() => navigator.clipboard.writeText(word.name.toLowerCase())}
			className="py-4 px-1.5 rounded-md bg-orange-200/20 cursor-copy dark:bg-gray-600/20 dark:hover:bg-gray-600/30 hover:bg-orange-200/40"
		>
			<div className="flex flex-col ml-2 cursor-copy">
				<h2 className="font-medium tracking-tight text-md">
					{word.name.toLowerCase()}
				</h2>
				<p className="text-xs italic">
					{word.type}
				</p>
				<p className="mt-1.5 text-sm dark:text-gray-300">
					{word.definition}
				</p>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const words = await getWords(process.env.NOTION_WORDS_ID as string);

	return {
		props: { words }
	};
}
