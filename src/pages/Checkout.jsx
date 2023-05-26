import { useState } from "react";
import useCart from "../hooks/useCart";
import Stepper from "../components/Stepper";
import UserDetails from "../components/checkout/User";
import ShippingDetails from "../components/checkout/Shipping";
import Confirmation from "../components/checkout/Confirmation";
import PaymentDetails from "../components/checkout/Payment";

const Checkout = ({ title = "Checkout", subtitle = "Complete your order" }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validStep, setValidStep] = useState(false);
  const cityList = [
    {
      const: "foo",
      title: "Foo",
    },
    {
      const: "bar",
      title: "Bar",
    },
  ];
  const cityShippingMapping = [
    {
      const: "foo",
      title: "Foo",
    },
    {
      const: "bar",
      title: "Bar",
    },
  ];
  const timeOptions = [
    {
      const: "foo",
      title: "Foo",
    },
    {
      const: "bar",
      title: "Bar",
    },
  ];
  const paymentOptions = [
    {
      const: "foo",
      title: "Foo",
    },
    {
      const: "bar",
      title: "Bar",
    },
  ];

  const shippingOptions = [
    {
      const: "foo",
      title: "Foo",
    },
    {
      const: "bar",
      title: "Bar",
    },
  ];

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
  } = useCart();

  const steps = ["User details", "Shipping", "Confirmation", "Payment"];

  const validateStep = () => {
    setValidStep(false);
  };

  const navigateTo = (step) => {
    validateStep();
    setActiveStep(step);
  };

  const handleChange = (key, value) => {
    console.log({ key, value });
  };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <UserDetails
            user={user}
            cityList={cityList}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <ShippingDetails
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
            cityShippingMapping={cityShippingMapping}
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
    <div>
      <Stepper steps={steps} activeStep={activeStep} />
      <div style={{ padding: "20px" }}>
        {getSectionComponent()}
        {activeStep !== 0 && activeStep !== steps.length - 1 && (
          <button onClick={() => navigateTo(activeStep - 1)}>Previous</button>
        )}
        {activeStep !== steps.length - 1 && (
          <button onClick={() => navigateTo(activeStep + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
