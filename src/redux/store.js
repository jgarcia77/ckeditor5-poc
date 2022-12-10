import { configureStore } from '@reduxjs/toolkit'
import chronological from './chronological';

export const store = configureStore({
  reducer: {
    chronological
  },
})