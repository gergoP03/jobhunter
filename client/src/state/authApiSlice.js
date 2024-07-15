import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAuthToken } from './authSlice'; // Importáljuk az authSlice-ból a megfelelő selectort

// Globális konfiguráció a fetchBaseQuery-nek
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3030/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Az auth token selectora segítségével kérjük le a tokent
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: (id) => `users/${id}`
    }),
    userExperiences: builder.query({
      query: () => `experiences`
    }),
    getJobsForApplicant: builder.query({ 
      query: (id) => `applicants?userId=${id}`,
      providesTags: ['Applicants']
    }),
    getApplicantsForAJob: builder.query({
      query: (id) => `applicants?jobId=${id}`,
      providesTags: ['Applicants']
    }),
    userApply: builder.mutation({
      query(body) {
        return {
          url: `applicants`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Applicants'],
    }),
    deleteApply: builder.mutation({
      query: (id) => ({url: `applicants?jobId=${id}`, method: 'DELETE'}),
      invalidatesTags: ['Applicants'],
    }),
    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserInfoQuery, useUserExperiencesQuery, useUserApplyMutation, useGetJobsForApplicantQuery, useGetApplicantsForAJobQuery, useDeleteApplyMutation } = authApi;
