import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
     cart: [], shipping: 0, payment: 0, express: false, coupon: false,
  },
  reducers: {
    add: (state, action) => {
      state.cart.push(action);
    },
    remove: (state, action) => {
      //action is cart index
      state.cart.splice(action, 1);
    },
    update: (state, payload) => {
      state.cart[payload.index].quantity = payload.quantity;
    },
    clear: (state) => {
      state.cart = [];
    },
    addShippingAddress: (state, payload) => {
      state.address = payload;
    },
    addShippingMethod: (state, payload) => {
      state.shipping =  payload.id;
    },
    addPaymentmethod: (state, payload) => {
      state.payment = payload;
    },
    addExpressShipping: (state, payload) => {
      state.express = payload;
    },
    addDeliveryDate: (state, payload) => {
      state.delivery_date = payload;
    },
    addDeliveryTime: (state, payload) => {
      state.delivery_time =  payload;
    },
  },
});

export const { add, remove, update } = orderSlice.actions;

export default orderSlice.reducer;