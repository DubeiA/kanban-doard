import { Octokit } from 'octokit';
// import { TOKEN } from 'config.js';

const octokit = new Octokit({
  auth: localStorage.getItem('accessToken'),
});

export const fetchIssues = async (owner, repo, page) => {
  console.log(owner, repo, page);
  try {
    const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      page,
      per_page: 5,
    });

    const data = issues.data.map(sta => sta);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
