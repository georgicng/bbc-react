import { Link } from "react-router-dom";
const LINK_MAP = {
  cart: "View Cart",
  products: "Continue Shopping",
};

const CartTotals = ({ link, subtotal, discount, total }) => {
  return (
    <div className="cart-info text-right">
      <h4>
        Sub-total: <span>N{ subtotal }</span>
      </h4>
      {discount > 0 && (
        <h4>
          Discount (coupon): <span>- N{ discount }</span>
        </h4>
      )}
      <h4>
        Total: <span>N{ total }</span>
      </h4>
      <Link to={`/${link}`} className="btn btn-black">
        {LINK_MAP[link]}
      </Link>
      <Link to="/checkout" className="btn btn-orange">
        Checkout
      </Link>
    </div>
  );
};

export default CartTotals;
