import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction.js";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
