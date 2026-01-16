import { createSlice } from "@reduxjs/toolkit";

const storedCompareItems = (() => {
    try {
        const data = localStorage.getItem("compare");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Invalid wishlist in localStorage", error);
        return [];
    }
})();

export const initialState = {
    compareItems: storedCompareItems || [],
    maxLimit: 3,
}

export const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addToCompare: (state, action) => {

            if (!action.payload?.id) return;

            if (state.compareItems.length >= state.maxLimit) {
                console.warn("Compare limit reached");
                return;
            };

            const existingItem = state.compareItems.find((item) => item.id === action.payload.id);

            if (!existingItem) {
                state.compareItems.push({ ...action.payload, isCompareItem: true });
            }
            localStorage.setItem("compare", JSON.stringify(state.compareItems));
        },
        removeFromCompare: (state, action) => {
            state.compareItems = state.compareItems.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("compare", JSON.stringify(state.compareItems));
        },
        toggleCompare: (state, action) => {
            const existingItem = state.compareItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.isCompareItem = !existingItem.isCompareItem;
            }
            localStorage.setItem("compare", JSON.stringify(state.compareItems));
        },
        clearCompare: (state) => {
            state.compareItems = [];
            localStorage.removeItem("compare");
        },
    },
});

export const {
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
} = CompareSlice.actions;

export default CompareSlice.reducer;