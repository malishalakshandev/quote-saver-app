import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: async (headers) => {
        return new Promise((resolve) => {
            async function checkToken() {
                const clerk = window.Clerk;
                if (clerk) {
                    const token = await clerk.session?.getToken();
                    headers.set("Authorization", `Bearer ${token}`);
                    resolve(headers);
                } else {
                    setTimeout(checkToken, 500);
                }
            }
            checkToken();

        });
    }, 
  }),
  endpoints: (build) => ({
    createQuote: build.mutation({
        query: (quote) => ({
            url: "/quotes",
            method: "POST",
            body: quote,
        }),
    }),
    getQuotesByUserId: build.query({
        query: () => ({
            url: "/quotes",
            method: "GET",
        }),
    }),
    updateQuoteById: build.mutation({
        query: ({ id, ...data}) => ({
            url: `/quotes/${id}`,
            method: "PUT",
            body: data,
        }),
    }),
    deleteQuoteById: build.mutation({
        query: (id) => ({
            url: `/quotes/${id}`,
            method: "DELETE",
        }),
    }),
    getPublicQuotes: build.query({
        query: () => ({
            url: "/quotes/public",
            method: "GET",
        }),
    }),
    // toggleTodoStatusById: build.mutation({
    //     query: (id) => ({
    //         url: `/todos/${id}/toggle`,
    //         method: "PATCH",
    //     }),
    // }),
  }),
})

export const { useCreateQuoteMutation, useGetQuotesByUserIdQuery, useUpdateQuoteByIdMutation, useDeleteQuoteByIdMutation, useGetPublicQuotesQuery } = api;