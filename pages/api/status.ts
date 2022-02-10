import { statusCodes } from 'data/statuses';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.send('Method not allowed.');
    }

    const keys = Object.keys(statusCodes);
    const status = keys[Math.floor(Math.random() * keys.length)];

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=200, stale-while-revalidate=100'
    );

    return res.status(200).json({
        status
    });
}
