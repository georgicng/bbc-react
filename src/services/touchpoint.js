import { apiService } from "./api";
import { API_ENDPOINT_SUFFIX, API_ENDPOINT_PREFIX, API_PREFIX  } from "../config";

export const touchpointService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getFaq: build.query({
      query: () => ({
        url: `${API_ENDPOINT_PREFIX}/faq/${API_ENDPOINT_SUFFIX}`,
        query: { depth: 1 },
      }),
      transformResponse: (response) => response.data,
    }),
    postFile: build.mutation({
      query: (body) => ({
        url: `${API_PREFIX}/files`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    postIssue: build.mutation({
      query: (body) => ({
        url: `${API_ENDPOINT_PREFIX}/issues/${API_ENDPOINT_SUFFIX}`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    postContact: build.mutation({
      query: (body) => ({
        url: `${API_ENDPOINT_PREFIX}/enquiries/${API_ENDPOINT_SUFFIX}`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

// Auto-generated hooks
export const { useGetFaqQuery, usePostIssueMutation, usePostContactMutation, usePostFileMutation } = touchpointService;
