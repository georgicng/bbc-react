import { Link } from "react-router-dom";

const CartTotals = ({ link, subtotal, discount, total }) => {
  const LINK_MAP = {
    cart: "View Cart",
    product: "Continue Shopping",
  };
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
        Pay Now
      </Link>
    </div>
  );
};

export default CartTotals;
