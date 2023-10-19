import axios from 'axios';
import { NextApiResponse } from 'next/types';

async function fetchAllCommits(url, token, commits = []) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        commits.push(...response.data);

        // Check for pagination
        if (response.headers.link) {
            const links = response.headers.link.split(',');
            const nextLink = links.find(link => link.includes('rel="next"'));

            if (nextLink) {
                // Extract the URL for the next page
                const nextPage = nextLink.split(';')[0].replace('<', '').replace('>', '').trim();
                await fetchAllCommits(nextPage, token, commits);
            }
        }

        return commits.map(commit => ({
            // sha: commit.sha,
            message: commit.commit.message,
            // author: commit.commit.author.name,
            date: commit.commit.author.date
        }));
    } catch (error) {
        console.error('Error fetching commits:', error);
    }
}

const owner = 'ntalamdotcom';  // Replace with your GitHub username
const repo = 'portfolio';  // Replace with your repository name
const token = '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';  // Replace with your personal access token
const initialUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

/**In memory until restart server */
let commits = [];

export default async function handler(
    // @ts-ignore
    req: NextApiRequest, 
    res: NextApiResponse) {
    // var com = []
    try {
        if (commits.length === 0) {
            await fetchAllCommits(initialUrl, token).then(async aux => {
                // console.log('All commits:', commits);
                console.log("loading commits")
                commits = aux
                // return commits
            });
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error })
        return
    }
    res.status(200).send(commits)
    // res.status(200).send(await getPrivateRepoTags(owner, repo, token))
}

// let counter = 0;  // This variable is in-memory storage

// export default function handler(req, res) {
//   counter += 1;
//   res.status(200).json({ visit: counter });
// }