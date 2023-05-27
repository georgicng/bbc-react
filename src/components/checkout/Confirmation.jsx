import { Link } from "react-router-dom";
import CartItems from "../CartItems";
import CartTotals from "../CartTotals";

function Confirmation({
  cart,
  total,
  discount,
  shippingRate,
  subtotal,
  tos,
  onChange,
}) {
  return (
    <>
      <div className="innerpage-heading text-center">
        <h3>Confirm Order</h3>
        <p>We need to save your order</p>
      </div>
      <div className="order-list">
        <CartItems cart={cart} readonly={true} />
        <CartTotals
          shipping={shippingRate}
          discount={discount}
          subtotal={subtotal}
          total={total}
        />
      </div>
      <div className="custom-control custom-checkbox my-3">
        <input
          className="custom-control-input"
          type="checkbox"
          id="tos"
          checked={tos}
          onChange={(e) => onChange('tos', e.target.value)}
        />
        <label className="custom-control-label" htmlFor="tos">
          <h4>
            I agree to{" "}
            <Link to="/terms" target="_blank">
              Terms of Service
            </Link>
          </h4>
        </label>
        {!tos && (
          <div className="error">
            You are required to agree to the terms and conditions
          </div>
        )}
      </div>
    </>
  );
}

export default Confirmation;
