import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
     loader: false, showNav: false, showCart: false, pageCover: false, pageTitle: '',
  },
  reducers: {
    toggleCart: (state, { payload }) => {
      state.showCart = payload;
    },
    toggleNav: (state, { payload }) => {
      state.showNav = payload;
    },
    showLoader: (state, { payload }) => {
      state.loader = payload;
    },
    showCover: (state, { payload }) => {
      state.pageCover = payload;
    },
    setTitle: (state, { payload }) => {
      state.showNav = payload;
    },
  },
});

export const { toggleCart, toggleNav, showCover, showLoader, setTitle } = commonSlice.actions;

export default commonSlice.reducer;