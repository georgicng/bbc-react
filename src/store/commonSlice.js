import { createSlice } from "@reduxjs/toolkit";
import { MENU } from "../config";

const metaMap = MENU.reduce((acc, menu) => ({...acc, [menu.path]: menu}), {})

export const commonSlice = createSlice({
  name: "common",
  initialState: {
     loader: false, showNav: false, showCart: false, pageMeta: null,
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
    setPageMeta: (state, { payload }) => {
      state.pageMeta = metaMap[payload];
    },
  },
});

export const { toggleCart, toggleNav, showLoader, setPageMeta } = commonSlice.actions;

export default commonSlice.reducer;