import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE,  TOKEN } from "../config";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
