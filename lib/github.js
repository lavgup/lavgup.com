import { Octokit } from '@octokit/core';
import { createPullRequest } from 'octokit-plugin-create-pull-request';

const MyOctokit = Octokit.plugin(createPullRequest);

export async function createPull(info, key) {
    const ocktokit = new MyOctokit({
        auth: key
    });

    const pr = await ocktokit.createPullRequest({
        owner: 'lavgup',
        repo: 'game-wiki-db',
        title: `Add ${info.game}`,
        body: `This pull request was created through the website.
        
        It adds the game ${info.game} with the wiki [${info.name}](https://${info.wiki}.${info.farm}.com/).`
            .replace(/^[^\S\n]*(?=\S)/gm, ''),
        base: 'master',
        head: info.wiki.split(' ').join('-').toLowerCase(),
        changes: [
            {
                files: {
                    'db.json': ({ exists, encoding, content }) => {
                        if (!exists) return null;

                        const data = Buffer.from(content, encoding).toString('utf-8');
                        const parsed = JSON.parse(data);

                        if (parsed?.games.find(e => e.name === info.game)) return null;

                        const gameObject = {
                            name: info.game,
                            wiki: {
                                name: info.name,
                                subdomain: info.wiki,
                                farm: info.farm,
                                fullUrl: `https://${info.wiki}.${info.farm}.com/`
                            }
                        };

                        parsed.games.push(gameObject);

                        return JSON.stringify(parsed, '\n', 2);
                    }
                },
                commit: `Add ${info.game}`
            }
        ]
    });

    return pr.data.number;
}