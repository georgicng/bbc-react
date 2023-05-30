import { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import useCart from "../hooks/useCart";
import {
  useGetCheckoutOptionsQuery,
  useAddOrderMutation,
  useConfirmOrderMutation,
} from "../services/order";
import {
  getCityList,
  getShippingList,
  getPaymentOptions,
  getCityShippingMapping,
} from "../utils";
import Heading from "../components/Heading";
import Stepper from "../components/Stepper";
import UserDetails from "../components/checkout/User";
import ShippingDetails from "../components/checkout/Shipping";
import Confirmation from "../components/checkout/Confirmation";
import PaymentDetails from "../components/checkout/Payment";

const Checkout = ({ title = "Checkout", subtitle = "Complete your order" }) => {
  const {
    data: options,
    isLoading,
    // error,
    // refetch,
  } = useGetCheckoutOptionsQuery();
  useLoader(isLoading);

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState({});
  const [cityList, setCityList] = useState(["Other"]);
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
    order,
    orderId,
    addUserDetails,
    addShipping,
    addPaymentMethod,
    addDeliveryPeriod,
    acceptTerms,
    addOrderId,
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
      ...(shipping?.type === "partner"
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

  const steps = [
    { title: "User Details", icon: "fa fa-user", key: "user" },
    { title: "Delivery Details", icon: "fa fa-truck", key: "shipping" },
    { title: "Confirm Order", icon: "fa fa-check", key: "confirm" },
    { title: "Complete Order", icon: "fa fa-credit-card", key: "pay" },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const userRef = useRef();
  const getSectionComponent = () => {
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
            showErrors={invalid}
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
            showError={invalid}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <PaymentDetails
            payment={payment}
            meta={paymentOptions[payment]?.meta}
          />
        );
      default:
        return null;
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return userRef.current.validate();
      case 1:
        return delivery?.date && delivery?.time && shipping?.id && payment;
      case 2:
        return tos;
      default:
        return true;
    }
  };

  const [completeOrder, { isLoading: finishing }] = useAddOrderMutation();
  const [submitOrder, { data: orderReference, isLoading: submitting }] =
    useConfirmOrderMutation();

  const navigate = useNavigate();
  const complete = async () => {
    if (payment === "transfer") {
      const payload = {
        order: orderId,
        payment: "Transfer",
        confirm: true,
      };
      await completeOrder(payload);
      navigate("/success");
    }
  };

  const navigateTo = (to, current, hook) => {
    const valid = validateStep(current);
    if (!valid) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    if (typeof hook === "function") {
      hook();
    }
    setActiveStep(to);
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div className="container-fluid">
        <Heading title={title} subtitle={subtitle} />
        <div id="checkout-page" className="no-back">
          <div className="row">
            <div className="col-sm-12 offset-lg-2 col-lg-8">
              <Stepper steps={steps} activeStep={activeStep} />
              <div style={{ padding: "20px" }}>{getSectionComponent()}</div>
              <div
                className={`d-flex ${
                  activeStep !== 0 && activeStep !== steps.length - 1
                    ? "justify-content-between"
                    : "justify-content-end"
                }`}
                style={{ padding: "0 20px" }}
              >
                {activeStep !== 0 && activeStep !== steps.length - 1 && (
                  <button
                    className="btn"
                    onClick={() => navigateTo(activeStep - 1, activeStep)}
                  >
                    Previous
                  </button>
                )}
                {activeStep !== steps.length - 1 && (
                  <button
                    className="btn"
                    disabled={steps[activeStep].key === "confirm" && submitting}
                    onClick={() =>
                      navigateTo(
                        activeStep + 1,
                        activeStep,
                        steps[activeStep].key === "confirm"
                          ? async () => {
                              await submitOrder(order);
                              addOrderId(orderReference.order_id);
                            }
                          : null
                      )
                    }
                  >
                    Next
                  </button>
                )}
                {activeStep === steps.length - 1 && (
                  <button
                    className="btn"
                    disabled={finishing}
                    onClick={complete}
                  >
                    Finish
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
