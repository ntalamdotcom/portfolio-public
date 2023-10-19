import { NextApiRequest, NextApiResponse } from 'next/types';
import { Octokit } from "@octokit/rest";
import { totalRepositoriesNoRes } from './total-repositories';


export default async function listRepositories(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  console.debug("req.query: " + JSON.stringify(req.query))
  var per_page;
  if (req.query.limit) {
    per_page = Number(req.query.limit);
  }
  var page;
  if (req.query.page) {
    page = Number(req.query.page);
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN, // Make sure to add your GitHub token to the .env.local file
  });

  try {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      visibility: "all",
      per_page,
      page
    });
    
    console.log("a repo: ", data[0]);
    const repos = data.map((repo) => ({
      name: repo.name,
      private: repo.private,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
      projectName: repo.name,
      id: repo.id,
      html_url: repo.html_url,
      visibility: repo.visibility,
      releases_url: repo.releases_url,
    }));

    const total = await totalRepositoriesNoRes()
    const response = {
      repos,
      total
    }
    return res.status(200).json(response);

  } catch (error: any) {
    console.error("list-repositories: ", error);
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
}
