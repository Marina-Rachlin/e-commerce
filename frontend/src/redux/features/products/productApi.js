import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "create-product",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllProducts: builder.query({
      query: ({ category, brand, stock, value, page, pageSize, context }) => ({
        url: `get-products?category=${category}&brand=${brand}&stock=${stock}&value=${value}&page=${page}&pageSize=${pageSize}&context=${context}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // getAllProductsShop: builder.query({
    //   query: ({page}) => ({
    //     url: `get-products-shop?page=${page}`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),
    getAllProductsShop: builder.query({
      query: ({ page, sort, pageSize, brand }) => {
        // Construct the query URL based on the presence of the sort parameter
        let url = `get-products-shop?page=${page}&pageSize=${pageSize}`;
        if (sort) {
          url += `&sort=${sort}`;
        }
        if (brand) {
          url += `&brand=${brand}`;
        }
        return {
          url,
          method: "GET",
        };
      },
    }),
    getBrands: builder.query({
      query: () => ({
        url: "get-brands",
        method: "GET",
        // credentials: "include",
      }),
    }),
    
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `get-product/${productId}`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, productId }) => ({
        url: `add-review/${productId}`,
        body: {
          review,
          rating,
        },
        method: "PUT",
        credentials: "include",
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, productId, reviewId }) => ({
        url: `add-reply`,
        body: {
          comment,
          productId,
          reviewId,
        },
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetAllProductsShopQuery,
  useGetProductDetailsQuery,
  useAddReviewMutation,
  useAddReplyInReviewMutation,
  useGetBrandsQuery
} = productApi;
