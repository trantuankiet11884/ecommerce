import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction.js";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    loading: false,
    error: "",
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },
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

export const { showModal, showCart } = appSlice.actions;
export default appSlice.reducer;
