import { configureStore } from "@reduxjs/toolkit";
// Slice Reducers
import ProductsReducer from "../Slice/CartSlice";
import WishlistReducer from "../Slice/WishlistSlice";
import CompareReducer from "../Slice/CompareSlice";
// Queries
import ApiQuery from "../../API/Query/ApiQuery";
import WishlistQuery from "../../API/Query/WishlistQuery";
import CompareQuery from "../../API/Query/CompareQuery";
import UsersQuery from "../../API/Query/UsersQuery";
// Thunks
import ProductReducer from "../../API/Thunk/ApiThunk";
import WishlistThunk from "../../API/Thunk/WishlistThunk";
import CompareThunk from "../../API/Thunk/CompareThunk";
import UsersThunk from "../../API/Thunk/UsersThunk";
import AuthThunk from "../../API/Thunk/AuthThunk";
import CheckoutThunk from "../../API/Thunk/CheckoutThunk";
import CartThunk from "../../API/Thunk/CartThunk";
// Middleware
import { Logger } from "../../API/Middleware/Logger";

const Store = configureStore({
    reducer: {
        // Queries
        [ApiQuery.reducerPath]: ApiQuery.reducer,
        [WishlistQuery.reducerPath]: WishlistQuery.reducer,
        [CompareQuery.reducerPath]: CompareQuery.reducer,
        [UsersQuery.reducerPath]: UsersQuery.reducer,

        // Thunk
        productItems: ProductReducer,
        wishlistData: WishlistThunk,
        compareData: CompareThunk,
        usersData: UsersThunk,
        auth: AuthThunk,
        checkout: CheckoutThunk,
        cart: CartThunk,

        // Rtk Slices
        products: ProductsReducer,
        wishlist: WishlistReducer,
        compare: CompareReducer,
    },
    // Middlewares
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            ApiQuery.middleware,
            WishlistQuery.middleware,
            CompareQuery.middleware,
            UsersQuery.middleware,
            Logger,
        );
    }
});

export default Store;