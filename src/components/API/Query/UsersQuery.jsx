import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersQuery = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
} = UsersQuery;

export default UsersQuery;