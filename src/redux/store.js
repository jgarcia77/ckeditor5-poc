import { configureStore, combineReducers } from '@reduxjs/toolkit'
import chronological from './chronological';
import inline from './inline';
import fields from './fields';
import users from './users';
import threads from './threads';
import clipBoards from './clipBoards';

const commenting = combineReducers({
  users,
  threads,
  chronological,
  inline,
  fields,
  clipBoards
});

export const store = configureStore({
  reducer: {
    commenting
  },
});