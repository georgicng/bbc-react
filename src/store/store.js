import { configureStore } from "@reduxjs/toolkit";
import order from "./orderSlice";
import { apiService } from "../services/api";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    order
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
