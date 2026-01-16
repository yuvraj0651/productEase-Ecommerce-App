import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CompareQuery = createApi({
    reducerPath: "compareApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
    tagTypes: ["Compare"],
    endpoints: (builder) => ({
        fetchCompareItems: builder.query({
            query: () => "compare",
            providesTags: ["Compare"],
        }),
        addCompareItem: builder.mutation({
            query: (newCompareItem) => ({
                url: "compare",
                method: "POST",
                body: newCompareItem,
            }),
            invalidatesTags: ["Compare"],
        }),
        removeCompareItem: builder.mutation({
            query: (id) => ({
                url: `compare/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Compare"],
        }),
        toggleCompareItem: builder.mutation({
            query: ({ id, isCompareItem }) => ({
                url: `compare/${id}`,
                method: "PATCH",
                body: { isCompareItem },
            }),
            invalidatesTags: ["Compare"],
        }),
    }),
});

export const {
    useFetchCompareItemsQuery,
    useAddCompareItemMutation,
    useRemoveCompareItemMutation,
    useToggleCompareItemMutation
} = CompareQuery;

export default CompareQuery;