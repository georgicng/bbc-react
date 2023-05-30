import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  remove,
  update,
  setUser,
  setShipping,
  setPayment,
  setDelivery,
  setTerms,
  setOrderId,
  setDiscount,
} from "../store/orderSlice";

const useCart = () => {
  const orderId = useSelector((state) => state.order.id);
  const tax = useSelector((state) => state.order.tax);
  const cart = useSelector((state) => state.order.cart);
  const discount = useSelector((state) => state.order.discount);
  const subtotal = useSelector((state) =>
    state.order.cart.reduce((acc, item) => {
      return (acc += parseFloat(item.price) * parseInt(item.quantity));
    }, 0)
  );
  const shippingRate = useSelector(
    (state) =>
      parseFloat(state.order.shipping?.rate || 0) +
      parseFloat(state.order.shipping?.express || 0)
  );
  const total = useMemo(
    () =>
      parseFloat(subtotal) +
      parseFloat(tax) +
      parseFloat(shippingRate) -
      parseFloat(discount),
    [subtotal, shippingRate, discount, tax]
  );
  //const total = useSelector((state) => ((subtotal + state.shippingFee) - discount));
  const express = useSelector((state) => state.order.shipping.express);
  const user = useSelector((state) => state.order.user);
  const shipping = useSelector((state) => state.order.shipping);
  const delivery = useSelector((state) => state.order.delivery);
  const payment = useSelector((state) => state.order.payment);
  const tos = useSelector((state) => state.order.tos);
  const order = useSelector((state) => {
    const items = state.order.cart.map((item) => {
      const line = {
        productid: item.line.id,
        quantity: item.quantity,
        price: item.price,
      };
      if (item.options) {
        line.options = item.options;
      }
      return line;
    });
    const order = {
      cart: items,
      address: state.order.address,
      shipping: state.order.shipping.id,
      payment: state.order.payment,
      delivery_date: new Date(state.order.delivery.date).toLocaleDateString(
        "en-NG"
      ),
      delivery_time: state.order.delivery.time,
      express: !!state.order.shipping?.express,
    };

    if (orderId && orderId > 0) {
      order.id = orderId;
    }

    if (state.order.coupon) {
      order.coupon = state.order.coupon;
    }

    return order;
  });

  const dispatch = useDispatch();
  const addItem = (payload) => {
    dispatch(add(payload));
  };
  const deleteItem = (payload) => {
    dispatch(remove(payload));
  };
  const changeQuantity = (payload) => {
    dispatch(update(payload));
  };

  const cartAction = (action, value) => {
    switch (action) {
      case "delete":
        deleteItem(value);
        break;
      case "update":
        changeQuantity(value);
    }
  };

  const addUserDetails = (payload) => {
    dispatch(setUser(payload));
  };

  const addShipping = (payload) => {
    dispatch(setShipping(payload));
  };

  const addPaymentMethod = (payload) => {
    dispatch(setPayment(payload));
  };

  const addDeliveryPeriod = (payload) => {
    dispatch(setDelivery(payload));
  };

  const addOrderId = (payload) => {
    dispatch(setOrderId(payload));
  };

  const addDiscountAmount = (payload) => {
    dispatch(setDiscount(payload));
  };

  const acceptTerms = (payload) => {
    dispatch(setTerms(payload));
  };

  return {
    cart,
    subtotal,
    discount,
    shippingRate,
    total,
    express,
    shipping,
    payment,
    user,
    tos,
    delivery,
    order,
    orderId,
    addItem,
    deleteItem,
    changeQuantity,
    cartAction,
    addUserDetails,
    addShipping,
    addPaymentMethod,
    addDeliveryPeriod,
    acceptTerms,
    addOrderId,
    addDiscountAmount
  };
};

export default useCart;
