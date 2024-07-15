import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
}),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "jobs",
      providesTags: ['Jobs']
    }),
    getOneJob: builder.query({
      query: (id) => `jobs/${id}`,
      providesTags: ['Jobs']
    }),
    getJobsForCompany: builder.query({
      query: (id) => `jobs?userId=${id}`,
      providesTags: ['Jobs']
    }),
    deleteJob: builder.mutation({
      query: (id) => ({url: `jobs/${id}`, method: 'DELETE'}),
      invalidatesTags: ['Jobs'],
    }),
    createJob: builder.mutation({
      query(body) {
        return {
          url: `jobs`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Jobs']
    }),
    updateJob: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `jobs/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Jobs'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJobsQuery, 
  useGetOneJobQuery, 
  useGetJobsForCompanyQuery , 
  useDeleteJobMutation, 
  useCreateJobMutation, 
  useUpdateJobMutation} = jobsApi