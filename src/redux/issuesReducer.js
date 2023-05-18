import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
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
    columns: {
      [nanoid()]: {
        name: 'To do',
        items: [],
      },
      [nanoid()]: {
        name: 'In Progress',
        items: [],
      },
      [nanoid()]: {
        name: 'Done',
        items: [],
      },
    },
  },
  reducers: {
    SearchRepo: (state, action) => {
      state.userRepo = action.payload;
    },
    increment: (state, action) => {
      state.page += 1;
    },
    decrement: (state, action) => {
      state.page -= 1;
    },

    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: {
    // Fecth issues
    [fetchIssues.pending]: state => {
      state.issues.isLoading = true;
      state.columns = {
        [nanoid()]: {
          name: 'To do',
          items: [],
        },
        [nanoid()]: {
          name: 'In Progress',
          items: [],
        },
        [nanoid()]: {
          name: 'Done',
          items: [],
        },
      };
    },
    [fetchIssues.fulfilled]: (state, { payload }) => {
      const toDoColumnKey = Object.keys(state.columns).find(
        key => state.columns[key].name === 'To do'
      );
      if (toDoColumnKey) {
        state.columns[toDoColumnKey].items = payload;
      }
      state.issues.allIssues = payload;
      state.issues.isLoading = false;
    },
    [fetchIssues.rejected]: (state, { payload }) => {
      state.issues.isLoading = false;
      state.issues.error = payload;
    },
  },
});

export const { SearchRepo, increment, updateColumns, decrement } =
  issuesReducer.actions;

export default issuesReducer.reducer;
