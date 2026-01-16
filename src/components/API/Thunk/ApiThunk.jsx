import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    fetchLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Products Data
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error("Sorry something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

// Add New Product
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (newProduct, { rejectWithValue }) => {
        try {
            const itemResponse = await fetch("https://fakestoreapi.com/products");
            if (!itemResponse.ok) {
                throw new Error("Sorry something went wrong while fetching the data");
            };
            const Item = await itemResponse.json();

            const existingItem = Item.find((product) => product.id === newProduct.id);

            if (existingItem) {
                return rejectWithValue("Product Item Already Exists");
            };

            let response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error("Sorry something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

// Delete Product from Api
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Sorry something went wrong while fetching the data");
            };
            return id;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

// Update Product Data
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, ...updatedData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("Sorry something went wrong while fetching the data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    }
);

export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.fetchLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addLoading = false;
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.items = state.items.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export default ProductSlice.reducer;