import { configureStore, combineReducers } from '@reduxjs/toolkit'
import chronological from './chronological';
import users from './users';

const commenting = combineReducers({
  users,
  chronological
});

export const store = configureStore({
  reducer: {
    commenting
  },
})