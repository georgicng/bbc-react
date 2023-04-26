import { apiService } from "./api";
import {
  API_ENDPOINT_PREFIX,
  API_ENDPOINT_SUFFIX,
  PAGE_SIZE,
  DEPTH_SIZE,
} from "../config";

const depth = DEPTH_SIZE;
const limit = PAGE_SIZE;

export const productService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (payload) => {
        const { page = 1, category = 0 } = payload;
        const offset = (page - 1) * limit;
        const query = {
          depth,
          limit,
          offset,
          ...(category > 0
            ? { "filters[categories.id][eq]": category }
            : { "filters[name][neq]": "custom" }),
        };
        return {
          url: `${API_ENDPOINT_PREFIX}/products/${API_ENDPOINT_SUFFIX}`,
          query,
        };
      },
      transformResponse: (response, _, { page, category }) => ({
        page: page + 1,
        items: response.data,
        tota: response.meta.query_total || response.meta.total_entries,
        category,
      }),
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `${API_ENDPOINT_PREFIX}/products/${API_ENDPOINT_SUFFIX}`,
        param: { id },
        query: { depth },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

// Auto-generated hooks
export const { useGetProductsQuery, useGetProductQuery } = productService;
