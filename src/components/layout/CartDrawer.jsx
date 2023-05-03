import CartItems from "../CartItems";
import CartTotals from "../CartTotals";

const CartDrawer = ({ showCart, orders, onClick }) => {
  return (
    <div
      id="shopping-cart-sidebar"
      className={`shc-sidebar" ${showCart ? "to-right-toggle" : ""}`}
    >
      <div className="sidecart-closebtn">
        <button
          className="btn btn-default"
          id="sidecart-close"
          onClick={onClick}
        >
          &times;
        </button>
      </div>
      <CartItems orders={orders} />
      <CartTotals link="cart" />
    </div>
  );
};

export default CartDrawer;
