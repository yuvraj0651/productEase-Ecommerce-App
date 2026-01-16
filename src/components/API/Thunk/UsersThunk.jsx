import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedUsers = (() => {
    try {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Something went wrong while storing data in localStorage", error);
        return [];
    }
})()

export const initialState = {
    users: storedUsers || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    errors: null,
};

// Fetching the users
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("something went wrong while fetching the users data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        };
    },
);

// Adding User Data
export const addingUser = createAsyncThunk(
    "users/addingUser",
    async ({newUser}, { rejectWithValue }) => {
        try {
            const usersWithStatus = {
                ...newUser,
                status: "active"
            };
            let response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(usersWithStatus),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding the users data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    },
);

// Delete User Data
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting the users data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Updating User Data
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, ...updatedUserData }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updatedUserData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating the users data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Toggle User Status
export const updateUserStatus = createAsyncThunk(
    "users/updateStatus",
    async ({ userId, updatedStatus }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ status: updatedStatus }),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating the users data");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.errors = null;
                localStorage.setItem("user", JSON.stringify(state.users));
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(addingUser.pending, (state) => {
                state.addLoading = true;
                state.errors = null;
            })
            .addCase(addingUser.fulfilled, (state, action) => {
                state.addLoading = false;
                state.users.push(action.payload);
                state.errors = null;
                localStorage.setItem("user", JSON.stringify(state.users));
            })
            .addCase(addingUser.rejected, (state, action) => {
                state.addLoading = false;
                state.errors = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.deleteLoading = true;
                state.errors = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
                state.errors = null;
                localStorage.setItem("user", JSON.stringify(state.users));
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteLoading = false;
                state.errors = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateLoading = true;
                state.errors = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user);
                state.errors = null;
                localStorage.setItem("user", JSON.stringify(state.users));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateLoading = false;
                state.errors = action.payload;
            })
            .addCase(updateUserStatus.pending, (state) => {
                state.updateLoading = true;
                state.errors = null;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.updateLoading = false;

                const index = state.users.findIndex(
                    (user) => user.id === action.payload.id
                );

                if (index !== -1) {
                    state.users[index].status = action.payload.status;
                }

                localStorage.setItem("user", JSON.stringify(state.users));
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.updateLoading = false;
                state.errors = action.payload;
            });
    },
});

export default UsersSlice.reducer;