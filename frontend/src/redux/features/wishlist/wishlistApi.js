import { apiSlice } from "../api/apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        addToWishlist: builder.mutation({
            query: (productId) => ({
                url: 'wishlist',
                method: 'POST',
                body: {productId},
                credentials: 'include'
            })
        }),
        getWishlist: builder.query({
            query: () => ({
                url: "wishlist",
                method: "GET",
                credentials: "include"
            })
        }),
        deleteFromWishlist: builder.mutation({
            query: (productId) => ({
                url: `wishlist/${productId}`,
                method: "DELETE",
                credentials: 'include'
            }),
        })
    })

})

export const {useAddToWishlistMutation, useGetWishlistQuery, useDeleteFromWishlistMutation} = wishlistApi