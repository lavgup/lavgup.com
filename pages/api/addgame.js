import { createPull } from '../../lib/github';

export default async function addGame(req, res) {
    try {
        const pullNumber = await createPull(req.query, process.env.GITHUB_ACCESS_KEY);
        res.status(200).json({
            pullNumber
        });
    } catch (err) {
        console.log(err);
        res.status(503).json({
            error: err.message
        });
    }
}