import { useRef, useEffect, useState, useMemo } from "react";
import useLoader from "../hooks/useLoader";
import useCart from "../hooks/useCart";
import { useGetCheckoutOptionsQuery } from "../services/order";
import {
  getCityList,
  getShippingList,
  getPaymentOptions,
  getCityShippingMapping,
} from "../utils";
import Stepper from "../components/Stepper";
import UserDetails from "../components/checkout/User";
import ShippingDetails from "../components/checkout/Shipping";
import Confirmation from "../components/checkout/Confirmation";
import PaymentDetails from "../components/checkout/Payment";

const Checkout = ({ title = "Checkout", subtitle = "Complete your order" }) => {
  const {
    data: options,
    isLoading,
    error,
    refetch,
  } = useGetCheckoutOptionsQuery();
  useLoader(isLoading);

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState({});
  const [cityList, setCityList] = useState([]);
  const [cityShippingMap, setCityShippingMap] = useState([]);
  useEffect(() => {
    if (!options) {
      return;
    }
    const shippingList = getShippingList(options.shipping_method);
    const cityMap = getCityShippingMapping(shippingList?.home?.options);
    const cities = getCityList(options.shipping_method);
    const payments = getPaymentOptions(options.payment_methods);
    setShippingOptions(() => shippingList);
    setCityShippingMap(() => cityMap);
    setCityList(() => cities);
    setPaymentOptions(() => payments);
  }, [options]);

  const [activeStep, setActiveStep] = useState(0);
  const [validStep, setValidStep] = useState(false);

  const bank = "";
  const {
    user,
    delivery,
    cart,
    discount,
    subtotal,
    total,
    shippingRate,
    tos,
    payment,
    express,
    shipping,
    addUserDetails,
    addShipping,
    addPaymentMethod,
    addDeliveryPeriod,
    acceptTerms
  } = useCart();

  const timeOptions = useMemo(
    () => [
      {
        const: "11-1 PM",
        title: "11AM - 1PM",
      },
      {
        const: "1-3 PM",
        title: "1-3 PM",
      },
      ...(shipping.type === "partner"
        ? [
            {
              const: "3-5 PM",
              title: "3-5 PM",
            },
          ]
        : []),
    ],
    [shipping]
  );

  const steps = ["User details", "Shipping", "Confirmation", "Payment"];

  const userRef = useRef();
  const deliveryRef = useRef();
  const validateStep = (step) => {
    switch (step) {
      case 0:
        return userRef.current.validate();
      case 1:
        return deliveryRef.current.validate();
      case 2:
        return tos;
      default:
        return true;
    }
  };

  const navigateTo = (to, current) => {
    const valid = validateStep(current);
    setValidStep(() => valid);
    valid && setActiveStep(to);
  };

  const handleChange = (key, value) => {
    console.log({ key, value });
    switch (key) {
      case "user":
        addUserDetails(value);
        break;
      case "shipping":
        addShipping(value);
        break;
      case "express":
        addShipping({
          ...shipping,
          express: shipping.express ? 0 : 1000,
        });
        break;
      case "payment":
        addPaymentMethod(value);
        break;
      case "delivery":
        addDeliveryPeriod(value);
        break;
      case "tos":
        acceptTerms(tos ? false : true);
        break;
      default:
        return null;
    }
  };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <UserDetails
            ref={userRef}
            user={user}
            cityList={cityList}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <ShippingDetails
            ref={deliveryRef}
            valid={validStep}
            shippingRate={shippingRate}
            delivery={delivery}
            timeOptions={timeOptions}
            payment={payment}
            paymentOptions={paymentOptions}
            user={user}
            shipping={shipping}
            shippingOptions={shippingOptions}
            express={express}
            cityShippingMap={cityShippingMap}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <Confirmation
            tos={tos}
            cart={cart}
            discount={discount}
            subtotal={subtotal}
            total={total}
            shippingRate={shippingRate}
            onChange={handleChange}
          />
        );
      case 3:
        return <PaymentDetails payment={payment} bank={bank} />;
      default:
        return null;
    }
  }

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div className="container-fluid">
        <div id="checkout-page" className="no-back">
          <div className="row">
            <div className="col-sm-12 offset-lg-2 col-lg-8">
              <Stepper steps={steps} activeStep={activeStep} />
              <div style={{ padding: "20px" }}>
                {getSectionComponent()}
                {activeStep !== 0 && activeStep !== steps.length - 1 && (
                  <button
                    onClick={() => navigateTo(activeStep - 1, activeStep)}
                  >
                    Previous
                  </button>
                )}
                {activeStep !== steps.length - 1 && (
                  <button
                    onClick={() => navigateTo(activeStep + 1, activeStep)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
