import { forwardRef } from "react";
import DeliveryPeriod from "./shipping_cards/DeliveryPeriod";
import ShippingRate from "./shipping_cards/ShippingRate";
import PaymentMethod from "./shipping_cards/PaymentMethod";
import ShippingMethod from "./shipping_cards/ShippingMethod";

const Shipping = forwardRef(function Shipping(
  {
    valid,
    shippingRate,
    delivery,
    timeOptions,
    payment,
    paymentOptions,
    user,
    shipping,
    shippingOptions,
    cityShippingMap,
    onChange,
  },
  ref
) {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <ShippingMethod
          valid={valid && shipping}
          user={user}
          shipping={shipping}
          shippingOptions={shippingOptions}
          cityShippingMap={cityShippingMap}
          onChange={onChange}
        />
        <DeliveryPeriod
          ref={ref}
          valid={valid && delivery?.time && delivery?.date}
          delivery={delivery}
          timeOptions={timeOptions}
          onChange={onChange}
        />
      </div>
      <div className="col-md-6 mb-3">
        <ShippingRate shippingRate={shippingRate} />
        <PaymentMethod
          valid={valid & payment}
          payment={payment}
          paymentOptions={paymentOptions}
          onChange={onChange}
        />
      </div>
    </div>
  );
});

export default Shipping;
