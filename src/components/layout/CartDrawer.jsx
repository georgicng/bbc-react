import CartItems from "../CartItems";
import CartTotals from "../CartTotals";

const CartDrawer = ({ showCart, cart, total, discount, subtotal, toggle, onChange }) => {
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
      <CartItems cart={cart} onChange={onChange} />
      {cart.length && (
        <CartTotals link="cart" discount={discount} subtotal={subtotal} total={total} />
      )}
    </div>
  );
};

export default CartDrawer;
