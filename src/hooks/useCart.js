import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, update } from "../store/orderSlice";

const useCart = () => {
  const cart = useSelector((state) => state.order.cart);
  const discount = useSelector((state) => state.order.discount);
  const subtotal = useSelector((state) =>
    state.order.cart.reduce((acc, item) => {
      return (acc += parseFloat(item.price) * parseInt(item.quantity));
    }, 0)
  );
  const shippingFee = useSelector((state) => state.order.shippingFee);
  const total = useMemo(
    () => parseFloat(subtotal) + parseFloat(shippingFee) - parseFloat(discount),
    [subtotal, shippingFee, discount]
  );
  //const total = useSelector((state) => ((subtotal + state.shippingFee) - discount));

  const dispatch = useDispatch();
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

  return {
    cart,
    subtotal,
    discount,
    shippingFee,
    total,
    deleteItem,
    changeQuantity,
    cartAction,
  };
};

export default useCart;
