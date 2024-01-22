import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_SERVER_URI}),
  endpoints: (builder) => ({
      loadUser: builder.query({
        query: () => ({
          url: "me",
          method: "GET",
          credentials: "include",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          // console.log("Query started with argument:", arg);
          try {
            const result = await queryFulfilled;
            // console.log("Query successful, result:", result);
            dispatch(userLoggedIn({ accessToken: result.data.accessToken, user: result.data.user}));
          } catch (error) {
            // console.error("Query failed, error:", error); // Log error if query fails
          }
        },
      }),
    }),
  })

  export const { useLoadUserQuery } = apiSlice;


