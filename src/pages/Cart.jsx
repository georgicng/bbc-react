import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import Coupon from "../components/Coupon";
import CartTotals from "../components/CartTotals";
import { remove, update } from "../store/orderSlice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  //TODO: import cartslice and map to variables
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const count = 0;
  const discount = 0;

  const handleChange = (key, value) => {
    console.log({ key, value });
    dispatch(update())
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="shopping-cart-page">
        <div className="container-fluid">
          <div className="innerpage-heading text-center">
            <h3>Your Cart</h3>
            <hr className="page-heading-line" />
          </div>
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                {count && (
                  <>
                    <CartItems cart={cart} onChange={handleChange} />
                    {discount <= 0 && <Coupon onClick={handleChange} />}
                    <CartTotals link="products" />
                  </>
                )}
                {!count && (
                  <>
                    <h1>
                      <i className="fab fa-superpowers"></i> Your Cart is Empty
                    </h1>
                    <Link to="/products" className="btn btn-orange">
                      <i className="fa fa-home"></i> Go Shopping
                    </Link>
                  </>
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
