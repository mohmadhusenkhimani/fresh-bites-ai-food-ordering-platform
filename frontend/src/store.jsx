import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
export const store = configureStore({
  reducer: {
    carts: cartReducer,
     auth: authReducer,
     wishlist: wishlistReducer,
  },
});
