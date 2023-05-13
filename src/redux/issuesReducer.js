import { createSlice } from '@reduxjs/toolkit';

import { fetchIssues, fetchNextPageIssues } from './issuesOperation';

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
    // next page
    // [fetchNextPageIssues.pending]: state => {
    //   state.issues.isLoading = true;
    // },
    // [fetchNextPageIssues.fulfilled]: (state, { payload }) => {
    //   state.issues.allIssues = payload;
    //   state.issues.isLoading = false;
    // },
    // [fetchNextPageIssues.rejected]: (state, { payload }) => {
    //   state.issues.isLoading = false;
    //   state.issues.error = payload;
    // },
    // // Add Contact
    // [addContact.pending]: state => {
    //   state.contacts.isLoading = true;
    // },
    // [addContact.fulfilled]: (state, { payload }) => {
    //   state.contacts.entities.push(payload);
    //   state.contacts.isLoading = false;
    // },
    // [addContact.rejected]: (state, { payload }) => {
    //   state.contacts.isLoading = false;
    //   state.contacts.error = payload;
    // },
    // // delete contact
    // [deleteContact.pending]: state => {
    //   state.contacts.isLoading = true;
    // },
    // [deleteContact.fulfilled]: (state, { payload }) => {
    //   state.contacts.isLoading = false;
    //   state.contacts.error = null;
    //   const index = state.contacts.entities.findIndex(
    //     contactID => contactID.id === payload.id
    //   );
    //   state.contacts.entities.splice(index, 1);
    // },
    // [deleteContact.rejected]: (state, { payload }) => {
    //   state.contacts.isLoading = false;
    //   state.contacts.error = payload;
    // },
  },
});

export const { AddContact, DeleteContact, SearchRepo, increment } =
  issuesReducer.actions;

export default issuesReducer.reducer;
