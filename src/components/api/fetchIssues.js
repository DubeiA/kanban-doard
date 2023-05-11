import { Octokit } from 'octokit';
import { TOKEN } from 'config.js';

const octokit = new Octokit({
  auth: TOKEN,
});

export const fetchIssues = async (owner, repo) => {
  try {
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      per_page: 5,
    });

    const data = issues.data.map(sta => sta);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
