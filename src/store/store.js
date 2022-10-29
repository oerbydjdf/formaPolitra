import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './../api/api';
import politraReducer from '../slice/politraSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    politra: politraReducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)