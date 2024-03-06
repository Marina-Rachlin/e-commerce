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
      invalidatesTags: ['Products']
    }),
    getAllProducts: builder.query({
      query: ({ category, brand, stock, value, page, pageSize, context }) => ({
        url: `get-products?category=${category}&brand=${brand}&stock=${stock}&value=${value}&page=${page}&pageSize=${pageSize}&context=${context}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllProductsShop: builder.query({
      query: ({ page, pageSize, category, brand, sort, price }) => {
        let queryParams = [];
        
        if (category) queryParams.push(`category=${encodeURIComponent(category)}`);//to deal with categories like "Bath & Body"
        if (brand) queryParams.push(`brand=${brand}`);
        if (sort) queryParams.push(`sort=${sort}`);
        if (page) queryParams.push(`page=${page}`);
        if (pageSize) queryParams.push(`pageSize=${pageSize}`);
        if (price) {
          // Assuming price is an array with two values [min, max]
          queryParams.push(`price=${price[0]}-${price[1]}`);
        }
        
        const queryString = queryParams.join('&');
    
        return {
          url: `get-products-shop?${queryString}`,
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `delete-product/${id}`,
        method: "DELETE",
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
  useGetCategoriesQuery,
  useDeleteProductMutation
} = productApi;
