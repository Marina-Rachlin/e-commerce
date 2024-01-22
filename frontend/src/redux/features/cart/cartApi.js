import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    updateCart: builder.mutation({
      query: (data) => ({
        url: "cart",
        method: "POST",
        body: { data },
        credentials: "include",
      }),
    }),
    getCart: builder.query({
      query: () => ({
        url: "cart",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteFromCart: builder.mutation({
      query: (productId) => ({
        url: `cart/${productId}`,
        method: 'DELETE',
        credentials: 'include'
      })
    }),
    fetchLatestProductData: builder.mutation({
      query: (productIds) => ({
        url: 'fetch-latest-product-data',
        method: 'POST',
        body: productIds,
      })
    })


  }),
});

export const { useUpdateCartMutation, useGetCartQuery, useDeleteFromCartMutation, useFetchLatestProductDataMutation } = cartApi;
