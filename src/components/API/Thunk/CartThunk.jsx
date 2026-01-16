import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

export const initialState = {
    cartData: storedCart || [],
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    error: null,
};

// Fetching Cart Data
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/cart");
            if (!response.ok) {
                throw new Error("Something went wrong while fetching the cart data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Adding Cart Data
export const addingCart = createAsyncThunk(
    "cart/addingCart",
    async (newCartData, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newCartData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while adding the cart data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Updating Cart Data
export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, newUpdateData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newUpdateData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while updating the cart data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartData = [];
            state.isLoading = false;
            state.addLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("cart");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload;
                state.error = null;
                localStorage.setItem("cart", JSON.stringify(state.cartData));
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addingCart.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addingCart.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cartData.push(action.payload);
                state.error = null;
                localStorage.setItem("cart", JSON.stringify(state.cartData));
            })
            .addCase(addingCart.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.cartData = state.cartData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
                localStorage.setItem("cart", JSON.stringify(state.cartData));
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    }
});

export default CartSlice.reducer;