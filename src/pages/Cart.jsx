import { remove, update } from "../store/orderSlice";
import useCart from "../hooks/useCart";
import { useDispatch } from "react-redux";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import Coupon from "../components/Coupon";
import CartTotals from "../components/CartTotals";

const Cart = ({ title = "Your Cart" }) => {
  //TODO: import cartslice and map to variables
  const dispatch = useDispatch();
  const { cart, discount, subtotal, total } = useCart();

  const handleChange = (key, value) => {
    console.log({ key, value });
    //dispatch(update());
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="shopping-cart-page">
        <div className="container-fluid">
          <Heading title={title} />
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <CartItems cart={cart} onChange={handleChange} />
                {cart.length && discount <= 0 && (
                  <Coupon onClick={handleChange} />
                )}
                {cart.length && (
                  <CartTotals
                    link="products"
                    subtotal={subtotal}
                    total={total}
                    discount={discount}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
