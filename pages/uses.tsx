import { useMDXComponent } from 'next-contentlayer/hooks';
import UsesLayout from 'layouts/uses';
import MDXComponents from 'components/MDXComponents';
import { allOtherPages } from '.contentlayer/data';
import { OtherPage } from '../.contentlayer/types';

export default function Uses({ body: { code } }: OtherPage) {
	const Component = useMDXComponent(code)

	return (
		<UsesLayout>
			<Component
				// @ts-ignore
				components={MDXComponents}
			/>
		</UsesLayout>
	);
}

export async function getStaticProps() {
	const uses = allOtherPages.find(page => page.slug === 'uses')!;

	return { props: uses };
}
