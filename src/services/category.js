import { apiService } from "./api";
import { API_ENDPOINT_SUFFIX, API_ENDPOINT_PREFIX,  } from "../config";

export const categoryService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: `${API_ENDPOINT_PREFIX}/categories/${API_ENDPOINT_SUFFIX}`,
        query: { depth: 1 },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

// Auto-generated hooks
export const { useGetCategoriesQuery } = categoryService;
