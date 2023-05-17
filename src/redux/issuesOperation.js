import { Octokit } from 'octokit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const octokit = new Octokit({
  auth: localStorage.getItem('accessToken'),
});

export const fetchIssues = createAsyncThunk(
  'issues/fetchAll',
  async ({ owner, repo, next = 1 }, { rejectWithValue }) => {
    try {
      console.log(owner, repo, next);
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        {
          owner,
          repo,
          page: next,
          per_page: 20,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      alert('incorect url, example -> https://github.com/owner/repo');
      return rejectWithValue(error.message);
    }
  }
);
