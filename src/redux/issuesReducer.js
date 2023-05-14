import { createSlice } from '@reduxjs/toolkit';

import { fetchIssues } from './issuesOperation';

const issuesReducer = createSlice({
  name: 'issues',
  initialState: {
    issues: {
      allIssues: [],
      isLoading: false,
      error: null,
    },
    userRepo: [],
    page: 2,
  },
  reducers: {
    SearchRepo: (state, action) => {
      state.userRepo = action.payload;
    },
    increment: (state, action) => {
      state.page += 1;
    },
    DragIssues: (state, action) => {
      state.issues.allIssues = action.payload;
    },
  },
  extraReducers: {
    // Fecth issues
    [fetchIssues.pending]: state => {
      state.issues.isLoading = true;
    },
    [fetchIssues.fulfilled]: (state, { payload }) => {
      state.issues.allIssues = payload;
      state.issues.isLoading = false;
    },
    [fetchIssues.rejected]: (state, { payload }) => {
      state.issues.isLoading = false;
      state.issues.error = payload;
    },
  },
});

export const { AddContact, DeleteContact, SearchRepo, increment, DragIssues } =
  issuesReducer.actions;

export default issuesReducer.reducer;
