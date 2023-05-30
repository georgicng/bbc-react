import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    cart: [],
    shipping: {type: '', id: '', rate: 0, express: 0},
    payment: "",
    coupon: '',
    discount: 0,
    user: {},
    tos: false,
    delivery: { date: '', time: '' },
    tax: 0,
    id: 0
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
    setDiscount: (state, { payload: { coupon, discount } }) => {
      state.coupon = coupon;
      state.discount = discount;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setTerms: (state, { payload }) => {
      state.tos = payload;
    },
    setOrderId(state, {payload}) {
      state.id = payload;
    }
  },
});

export const { add, remove, update, setUser, setShipping, setPayment, setDelivery, setTerms, setOrderId, setDiscount } = orderSlice.actions;

export default orderSlice.reducer;
