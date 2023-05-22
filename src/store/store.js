import { configureStore } from "@reduxjs/toolkit";
import order from "./orderSlice";
import common from "./commonSlice";
import { apiService } from "../services/api";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    order,
    common
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
