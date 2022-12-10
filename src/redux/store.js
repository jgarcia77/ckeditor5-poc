import { configureStore, combineReducers } from '@reduxjs/toolkit'
import chronological from './chronological';
import users from './users';
import threads from './threads';

const commenting = combineReducers({
  users,
  threads,
  chronological
});

export const store = configureStore({
  reducer: {
    commenting
  },
})