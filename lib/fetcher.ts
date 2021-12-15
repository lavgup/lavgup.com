import { Request } from 'next/dist/server/web/spec-compliant/request';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export default async function fetcher(
	input: Request,
	init?: RequestInit
) {
	const res = await fetch(input, init);

	return res.json();
}
