import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    cart: [],
    shipping: {type: '', id: '', rate: 0, express: 0},
    payment: "",
    coupon: false,
    discount: 0,
    user: {},
    tos: false,
    delivery: { date: '', time: '' },
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
    setShipping: (state, { payload }) => {
      state.shipping = payload;
    },
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
    setDelivery: (state, { payload }) => {
      state.delivery = payload;
    },
    setDiscount: (state, { payload }) => {
      state.discount = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setTerms: (state, { payload }) => {
      state.tos = payload;
    },
  },
});

export const { add, remove, update, setUser, setShipping, setPayment, setDelivery } = orderSlice.actions;

export default orderSlice.reducer;
