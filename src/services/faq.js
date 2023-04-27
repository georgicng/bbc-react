import { apiService } from "./api";
import { API_ENDPOINT_SUFFIX, API_ENDPOINT_PREFIX,  } from "../config";

export const faqService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: () => ({
        url: `${API_ENDPOINT_PREFIX}/faq/${API_ENDPOINT_SUFFIX}`,
        query: { depth: 1 },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

// Auto-generated hooks
export const { useGetFaqQuery } = faqService;
