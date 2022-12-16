import { configureStore, combineReducers } from '@reduxjs/toolkit'
import chronological from './chronological';
import inline from './inline';
import field from './field';
import users from './users';
import commentThreads from './commentThreads';
import clipBoards from './clipBoards';

const commenting = combineReducers({
  users,
  commentThreads,
  chronological,
  inline,
  field,
  clipBoards
});

export const store = configureStore({
  reducer: {
    commenting
  },
});