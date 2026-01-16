import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("auth"));

export const initialState = {
    authData: storedUser?.user || null,
    token: storedUser?.token || null,
    isAuthenticated: !!storedUser?.token,
    isLoading: false,
    registerLoading: false,
    error: null,
}

// Login Users
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("something went wrong while logging user");
            };
            let users = await response.json();

            const user = users.find((u) => u.email === email && u.password === password);

            if (!user) {
                throw new Error("Invalid email or password");
            }

            return user;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Registering User
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        const usersWithStatus = {
            ...newUser,
            status: "active",
        };
        try {
            let response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(usersWithStatus),
            });
            if (!response.ok) {
                throw new Error("something went wrong while registering user");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Update Password
export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async ({ userId, newPassword }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ password: newPassword })
            });
            if (!response.ok) {
                throw new Error("something went wrong while registering user");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

// Update Profile
export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async ({ userId, ...updatedCred }, { rejectWithValue }) => {
        try {
            let response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updatedCred),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating user credentials");
            };
            let data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.registerLoading = false;
            state.error = null;

            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;

                const fakeToken = "token_" + Date.now();

                state.authData = action.payload;
                state.token = fakeToken;
                state.isAuthenticated = true;
                state.error = null;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        user: action.payload,
                        token: fakeToken,
                    })
                )
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerLoading = false;

                const fakeToken = "token_" + Date.now();

                state.authData = action.payload;
                state.token = fakeToken;
                state.isAuthenticated = true;
                state.error = null;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        user: action.payload,
                        token: fakeToken,
                    })
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.authData.password = action.payload.password;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        user: state.authData,
                        token: state.token,
                    })
                )
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authData = action.payload;
                state.error = null;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        user: state.authData,
                        token: state.token,
                    })
                )
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;