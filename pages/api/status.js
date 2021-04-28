import statuses from '../../data/statuses';

export default (req, res) => {
	if (req.method !== 'GET') {
		return res.send('Method not allowed.');
	}

	const keys = Object.keys(statuses);
	const status = keys[Math.floor(Math.random() * keys.length)];

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=200, stale-while-revalidate=100'
	);

	return res.status(200).json({
		status
	});
}