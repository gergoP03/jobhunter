import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jobsApi } from './jobsApiSlice'
import { userApi } from './userApiSlice'
import { authApi } from './authApiSlice'
import {authSlice} from './authSlice'

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware).concat(userApi.middleware).concat(authApi.middleware),
});

setupListeners(store.dispatch);