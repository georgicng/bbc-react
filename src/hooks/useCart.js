import { useMemo } from "react";
import { useSelector } from "react-redux";

const useCart = () => {
  const cart = useSelector((state) => state.order.cart);
  const discount = useSelector((state) => state.order.discount);
  const subtotal = useSelector((state) =>
    state.order.cart.reduce((acc, item) => {
      return (acc += item.price);
    }, 0)
  );
  const shippingFee = useSelector((state) => state.shippingFee);
  const total = useMemo(
    () => parseFloat(subtotal) + parseFloat(shippingFee) - parseFloat(discount),
    [subtotal, shippingFee, discount]
  );
  //const total = useSelector((state) => ((subtotal + state.shippingFee) - discount));

  return { cart, subtotal, discount, shippingFee, total };
};

export default useCart;
