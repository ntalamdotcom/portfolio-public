import { Octokit } from "@octokit/rest";

export default async function totalRepositories(
  req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  try {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 1,
    });

    // Retrieve the total_count from the headers
    const headers = response.headers;
    console.log(headers)
    return res.status(200).json({ total_count: getNumber(headers.link) });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
}
export async function totalRepositoriesNoRes() {

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  try {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 1,
    });

    // Retrieve the total_count from the headers
    const headers = response.headers;
    console.log(headers)
    return getNumber(headers.link)
  } catch (error: any) {
    console.error(error);
    throw new Error("Error getting total repositories")
  }
}

function getNumber(linkHeader: string): number {
  // const linkHeader = '<https://api.github.com/user/repos?visibility=all&per_page=1&page=2>; rel="next", <https://api.github.com/user/repos?visibility=all&per_page=1&page=22>; rel="last"';
  const regex = /page=(\d+)>; rel="last"/;
  const match = linkHeader.match(regex);

  if (match && match[1]) {
    const lastPageNumber = parseInt(match[1], 10);
    return lastPageNumber
    // console.log(lastPageNumber);  // Outputs: 22
  } else {
    throw new Error("Invalid number")
  }

}