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
    //   query: ({ page, pageSize, category, brand, sort }) => ({
    //     url: `get-products?category=${category}&brand=${brand}&stock=${sort}&page=${page}&pageSize=${pageSize}`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),
    getAllProductsShop: builder.query({
      query: ({ page, pageSize, category, brand, sort }) => {
        let queryParams = [];
        
        if (category) queryParams.push(`category=${category}`);
        if (brand) queryParams.push(`brand=${brand}`);
        if (sort) queryParams.push(`stock=${sort}`);
        if (page) queryParams.push(`page=${page}`);
        if (pageSize) queryParams.push(`pageSize=${pageSize}`);
        
        const queryString = queryParams.join('&');
    
        return {
          url: `get-products?${queryString}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getBrands: builder.query({
      query: () => ({
        url: "get-brands",
        method: "GET",
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: "get-categories",
        method: "GET",
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
  useGetBrandsQuery,
  useGetCategoriesQuery
} = productApi;
