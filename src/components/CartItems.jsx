import CartItem from "./CartItem";

const CartItems = ({ cart, onChange }) => {
  return (
    <ul className="list-unstyled cart-list">
      {cart.map((item) => (
        <li key="index">
          <CartItem {...item} onChange={onChange} />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
