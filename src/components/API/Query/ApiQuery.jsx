import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiQuery = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => "products",
            providesTags: ["Products"],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `products/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = ApiQuery;

export default ApiQuery;