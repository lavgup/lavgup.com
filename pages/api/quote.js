export default async function(_, res) {
	const body = await fetch('https://api.quotable.io/random');
	const json = await body.json();

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600'
	);

	res.status(200).json({
		quote: json?.content
	});
}