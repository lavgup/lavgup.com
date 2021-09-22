import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getFileBySlug } from 'lib/mdx';
import UsesLayout from 'layouts/uses';
import MDXComponents from 'components/MDXComponents';

export default function Uses({ code }: { code: string }) {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	return (
		<UsesLayout>
			{/** @ts-ignore **/}
			<Component components={MDXComponents} />
		</UsesLayout>
	);
}

export async function getStaticProps() {
	const uses = await getFileBySlug('uses');

	return { props: uses };
}
