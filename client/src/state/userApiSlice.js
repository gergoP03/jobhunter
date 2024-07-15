import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useCookieContext } from '../context/CookieContext';



// Globális konfiguráció a fetchBaseQuery-nek
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3030/',

});
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
        query(body) {
          return {
            url: `authentication`,
            method: 'POST',
            body,
          }
        },
      }),
      register: builder.mutation({
        query(body) {
          return {
            url: `users`,
            method: 'POST',
            body,
          }
        },
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = userApi