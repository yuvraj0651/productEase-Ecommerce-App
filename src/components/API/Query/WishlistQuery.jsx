import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WishlistQuery = createApi({
    reducerPath: "wishlistApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
    tagTypes: ["Wishlist"],
    endpoints: (builder) => ({
        fetchWishlistItems: builder.query({
            query: () => "wishlist",
            providesTags: ["Wishlist"],
        }),
        addWishlistItem: builder.mutation({
            query: (newWishlistItem) => ({
                url: "wishlist",
                method: "POST",
                body: newWishlistItem,
            }),
            invalidatesTags: ["Wishlist"],
        }),
        removeWishlistItem: builder.mutation({
            query: (id) => ({
                url: `wishlist/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wishlist"],
        }),
        toggleWishlistItem: builder.mutation({
            query: ({ id, isWishlistItem }) => ({
                url: `wishlist/${id}`,
                method: "PATCH",
                body: { isWishlistItem },
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useFetchWishlistItemsQuery,
    useAddWishlistItemMutation,
    useRemoveWishlistItemMutation,
    useToggleWishlistItemMutation,
} = WishlistQuery;

export default WishlistQuery;