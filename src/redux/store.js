import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesReducer';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
