import { apiService } from "./api";
import {
  API_PREFIX,
  API_ENDPOINT_PREFIX,
  API_ENDPOINT_SUFFIX,
} from "../config";

export const orderService = apiService.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      query: (body) => ({
        url: `${API_PREFIX}/orders`,
        method: "POST",
        body,
      }),
    }),
    confirmOrder: build.mutation({
      query: ({ order, ...body }) => ({
        url: `${API_PREFIX}/orders/${order}`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    getCouponValue: build.query({
      query: (code) => ({
        url: `coupons/${API_ENDPOINT_SUFFIX}`,
        query: {
          single: 1,
          "filters[code][eq]": code,
        },
      }),
      transformResponse: (response) => response.data,
    }),
    getShippingMethods: build.query({
      query: () => ({
        url: `${API_ENDPOINT_PREFIX}/shipping_rates/${API_ENDPOINT_SUFFIX}`,
      }),
      transformResponse: (response) => response.data,
    }),
    getPaymentMethods: build.query({
      query: () => ({
        url: `${API_ENDPOINT_PREFIX}/payment_methods/${API_ENDPOINT_SUFFIX}`,
      }),
      transformResponse: (response) => response.data,
    }),
    getCheckoutOptions: build.query({
      query: () => ({
        url: `${API_PREFIX}/checkout_options`,
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useAddOrderMutation,
  useConfirmOrderMutation,
  useGetCouponValueQuery,
  useGetShippingMethodsQuery,
  useGetPaymentMethodsQuery,
  useGetCheckoutOptionsQuery,
} = orderService;
