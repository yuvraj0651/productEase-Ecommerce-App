import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    compareData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Compare Data
export const fetchCompareData = createAsyncThunk(
    "compare/fetchCompare",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/compare");
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

// Adding Compare Item
export const addCompareItem = createAsyncThunk(
    "compare/addCompareItem",
    async (newCompareItem, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/compare", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newCompareItem),
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

// Delete Compare Data
export const deleteCompareItem = createAsyncThunk(
    "compare/deleteCompare",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/compare/${id}`, {
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

// Update Compare Data
export const toggleCompareItem = createAsyncThunk(
    "compare/toggleCompare",
    async ({ id, isCompareItem }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/compare/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ isCompareItem }),
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

export const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompareData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCompareData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.compareData = action.payload;
                state.error = null;
            })
            .addCase(fetchCompareData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addCompareItem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addCompareItem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.compareData.push(action.payload);
                state.error = null;
            })
            .addCase(addCompareItem.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteCompareItem.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteCompareItem.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.compareData = state.compareData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteCompareItem.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(toggleCompareItem.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(toggleCompareItem.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.compareData = state.compareData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(toggleCompareItem.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export default CompareSlice.reducer;