import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
      overrideExisting: true,
    }),
    editProfile: builder.mutation({
      query: ({ name, email, phoneNumber, addresses }) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name, email, phoneNumber, addresses
        },
        credentials: "include",
      }),
      overrideExisting: true,
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include",
      }),
      overrideExisting: true,
    }),
    getAllUsers: builder.query({
      query: (role) => {
        const queryString = role ? `?role=${role}` : '';
        return {
          url: `get-users${queryString}`,
          method: "GET",
          credentials: "include",
        };
      },
      overrideExisting: true,
    }),
    
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include",
      }),
      overrideExisting: true,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      overrideExisting: true,
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = userApi;