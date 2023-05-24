import CartItems from "../CartItems";
import CartTotals from "../CartTotals";

const CartDrawer = ({ showCart, cart, total, subtotal, toggle }) => {
  return (
    <div
      id="shopping-cart-sidebar"
      className={`shc-sidebar ${showCart ? "to-right-toggle" : ""}`}
    >
      <div className="sidecart-closebtn">
        <button
          className="btn btn-default"
          id="sidecart-close"
          onClick={toggle}
        >
          &times;
        </button>
      </div>
      <CartItems cart={cart} />
      <CartTotals link="cart" subtotal={subtotal} total={total} />
    </div>
  );
};

export default CartDrawer;
