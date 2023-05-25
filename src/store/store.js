import { configureStore } from "@reduxjs/toolkit";
import order from "./orderSlice";
import layout from "./layoutSlice";
import { apiService } from "../services/api";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    order,
    layout
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
