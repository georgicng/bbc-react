import Delivery from "./shipping_cards/Delivery";
import Rate from "./shipping_cards/Rate";
import PaymentMethod from "./shipping_cards/PaymentMethod";
import ShippingMethod from "./shipping_cards/ShippingMethod";

function Shipping({
  valid,
  shippingRate,
  delivery,
  timeOptions,
  payment,
  paymentOptions,
  user,
  shipping,
  shippingOptions,
  express,
  cityShippingMapping,
  onChange,
}) {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <ShippingMethod
          valid={valid && shipping}
          user={user}
          shipping={shipping}
          shippingOptions={shippingOptions}
          express={express}
          cityShippingMapping={cityShippingMapping}
        />
        <Delivery
          valid={valid && delivery?.time && delivery?.date}
          formdate={delivery}
          timeOptions={timeOptions}
          onChange={onChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <Rate shippingRate={shippingRate} />
        <PaymentMethod
          valid={valid & payment}
          payment={payment}
          paymentOptions={paymentOptions}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Shipping;
