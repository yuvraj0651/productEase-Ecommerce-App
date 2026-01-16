import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedWishlist = (() => {
    try {
        const data = localStorage.getItem("wishlist");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Invalid wishlist in localStorage", error);
        return [];
    }
})();

export const initialState = {
    wishlistData: storedWishlist || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Wishlist Data
export const fetchWishlistData = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/wishlist");
            if (!response.ok) {
                throw new Error("something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    },
);

// Adding WIshlist Item
export const addWishlistItem = createAsyncThunk(
    "wishlist/addWishlistItem",
    async (newWishlistItem, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/wishlist", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newWishlistItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

// Delete Wishlist Data
export const deleteWishlistItem = createAsyncThunk(
    "wishlist/deleteWishlist",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while fetching the data");
            };
            return id;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

// Update Wishlist Data
export const toggleWishlistItem = createAsyncThunk(
    "wishlist/toggleWishlist",
    async ({ id, isWishlistItem }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ isWishlistItem }),
            });
            if (!response.ok) {
                throw new Error("something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        removeFromWishlist: (state) => {
            state.wishlistData = [];
            state.isLoading = false;
            state.addLoading = false;
            state.deleteLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("wishlist");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWishlistData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistData = action.payload;
                state.error = null;
                localStorage.setItem("wishlist", JSON.stringify(state.wishlistData));
            })
            .addCase(fetchWishlistData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addWishlistItem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.wishlistData.push(action.payload);
                state.error = null;
                localStorage.setItem("wishlist", JSON.stringify(state.wishlistData));
            })
            .addCase(addWishlistItem.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteWishlistItem.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.wishlistData = state.wishlistData.filter((item) => item.id !== action.payload);
                state.error = null;
                localStorage.setItem("wishlist", JSON.stringify(state.wishlistData));
            })
            .addCase(deleteWishlistItem.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(toggleWishlistItem.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(toggleWishlistItem.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.wishlistData = state.wishlistData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
                localStorage.setItem("wishlist", JSON.stringify(state.wishlistData));
            })
            .addCase(toggleWishlistItem.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export default WishlistSlice.reducer;