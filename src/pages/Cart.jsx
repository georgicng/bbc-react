import useCart from "../hooks/useCart";
import { useLazyGetCouponValueQuery } from "../services/order";
import Heading from "../components/Heading";
import CartItems from "../components/cart/CartItems";
import Coupon from "../components/cart/Coupon";
import CartTotals from "../components/cart/CartTotals";

const Cart = ({ title = "Your Cart" }) => {
  const {
    cart,
    discount,
    tax,
    subtotal,
    total,
    cartAction,
    addDiscountAmount,
  } = useCart();

  const [getCoupon, { data, isLoading }] = useLazyGetCouponValueQuery();
  const redeemCoupon = async (coupon) => {
    await getCoupon(coupon);
    addDiscountAmount({ coupon, discount: data });
  };

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
                  <Coupon disabled={isLoading} onClick={redeemCoupon} />
                )}
                {cart.length && (
                  <CartTotals
                    link="products"
                    tax={tax}
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
