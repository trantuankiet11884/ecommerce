import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction.js";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.newProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
