import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice.js";

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
  },
});
