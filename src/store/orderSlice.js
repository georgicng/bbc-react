import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    cart: [],
    shipping: "",
    payment: "",
    express: false,
    coupon: false,
    discount: 0,
    shippingRate: 0,
    user: {},
    tos: false,
    delivery: {},
  },
  reducers: {
    add: (state, { payload }) => {
      state.cart.push(payload);
    },
    remove: (state, { payload }) => {
      //action is cart index
      state.cart.splice(payload, 1);
    },
    update: (state, { payload: { index, quantity } }) => {
      state.cart[index].quantity = quantity;
    },
    clear: (state) => {
      state.cart = [];
    },
    addShippingAddress: (state, { payload }) => {
      state.address = payload;
    },
    addShippingMethod: (state, { payload }) => {
      state.shipping = payload.id;
    },
    addPaymentmethod: (state, { payload }) => {
      state.payment = payload;
    },
    addExpressShipping: (state, { payload }) => {
      state.express = payload;
    },
    addDeliveryDate: (state, { payload }) => {
      state.deliveryDate = payload;
    },
    addDeliveryTime: (state, { payload }) => {
      state.deliveryTime = payload;
    },
    setDiscount: (state, { payload }) => {
      state.discount = payload;
    },
    setShippingRate: (state, { payload }) => {
      state.shippingRate = payload;
    },
    setUserField: (state, { payload: { key, value } }) => {
      state.user[key] = value;
    },
    setDeliveryField: (state, { payload: { key, value } }) => {
      state.delivery[key] = value;
    },
    setTerms: (state, { payload }) => {
      state.tos = payload;
    },
  },
});

export const { add, remove, update } = orderSlice.actions;

export default orderSlice.reducer;
