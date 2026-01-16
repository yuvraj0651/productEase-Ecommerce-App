import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart"));

export const initialState = {
    cartItems: storedCart || [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        increaseCartQuantity: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        decreaseCartQuantity: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (!existingItem) return;

            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;