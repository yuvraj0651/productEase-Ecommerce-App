import { createSlice } from "@reduxjs/toolkit";

const storesWishlistItems = (() => {
    try {
        const data = localStorage.getItem("wishlistItem");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Invalid wishlist in localStorage", error);
        return [];
    }
})();

export const initialState = {
    wishlistItems: storesWishlistItems || [],
};

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {

            if (!action.payload?.id) return;

            const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);

            if (!existingItem) {
                state.wishlistItems.push({ ...action.payload, isWishlistItem: true });
            }
            localStorage.setItem("wishlistItem", JSON.stringify(state.wishlistItems));
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("wishlistItem", JSON.stringify(state.wishlistItems));
        },
        toggleWishlist: (state, action) => {
            const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.isWishlistItem = !existingItem.isWishlistItem;
            }
            localStorage.setItem("wishlistItem", JSON.stringify(state.wishlistItems));
        },
        clearWishlist: (state) => {
            state.wishlistItems = []
            localStorage.removeItem("wishlistItem");
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
} = WishlistSlice.actions;

export default WishlistSlice.reducer;