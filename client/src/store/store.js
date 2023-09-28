import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice.js";
import productSlice from "./products/productSlice.js";

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    products: productSlice,
  },
});
