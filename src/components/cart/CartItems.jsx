import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartItems = ({ cart, onChange }) => {
  const handleChange = (index) => {
    return (action, quantity = null) => {      
      onChange(action, quantity ? { index, quantity } : index) 
    }
  }

  if (!cart.length) {
    return (
      <>
        <h1>
          <i className="fab fa-superpowers"></i> Your Cart is Empty
        </h1>
        <Link to="/products" className="btn btn-orange">
          <i className="fa fa-home"></i> Go Shopping
        </Link>
      </>
    );
  }

  return (
    <ul className="list-unstyled cart-list">
      {cart.map((item, index) => (
        <li key={item.line.id}>
          <CartItem {...item} onChange={handleChange(index)} />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
