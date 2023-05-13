// import { Octokit } from 'octokit';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// const octokit = new Octokit({
//   auth: localStorage.getItem('accessToken'),
// });

// export const fetchIssues = createAsyncThunk(
//   'issues/fetchAll',
//   async ({ owner, repo, page }, { rejectWithValue }) => {
//     try {
//       const response = await octokit.request(
//         'GET /repos/{owner}/{repo}/issues',
//         {
//           owner,
//           repo,
//           page,
//           per_page: 5,
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
