import useCart from "../hooks/useCart";
import Heading from "../components/Heading";
import CartItems from "../components/CartItems";
import Coupon from "../components/Coupon";
import CartTotals from "../components/CartTotals";

const Cart = ({ title = "Your Cart" }) => {
  const { cart, discount, subtotal, total, cartAction } =
    useCart();

  const redeemCoupon = (coupon) => {
    console.log(coupon)
  }

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="shopping-cart-page">
        <div className="container-fluid">
          <Heading title={title} />
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <CartItems cart={cart} onChange={cartAction} />
                {cart.length && discount <= 0 && (
                  <Coupon onClick={redeemCoupon} />
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
