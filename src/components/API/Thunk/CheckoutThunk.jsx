import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    checkoutData: [],
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    error: null,
};

// Fetching Checkout Data
export const fetchCheckout = createAsyncThunk(
    "checkout/fetchCheckout",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/checkout");
            if (!response.ok) {
                throw new Error("Something went wrong while fetching the checkout data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Adding Checkout Data
export const addingCheckout = createAsyncThunk(
    "checkout/addingCheckout",
    async (newCheckoutData, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newCheckoutData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while adding the checkout data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Updating Checkout Data
export const updateCheckout = createAsyncThunk(
    "checkout/updateCheckout",
    async ({ id, newUpdateData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/checkout/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newUpdateData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong while updating the checkout data");
            }
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const CheckoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCheckout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCheckout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.checkoutData = action.payload;
                state.error = null;
            })
            .addCase(fetchCheckout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addingCheckout.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addingCheckout.fulfilled, (state, action) => {
                state.addLoading = false;
                state.checkoutData.push(action.payload);
                state.error = null;
            })
            .addCase(addingCheckout.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCheckout.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateCheckout.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.checkoutData = state.checkoutData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(updateCheckout.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    }
});

export default CheckoutSlice.reducer;