function Rate({ shippingRate }) {
  return (
    <div className="counter text-center my-3">
      <i className="fa fa-code fa-2x"></i>
      <h2 className="timer count-title count-number">N{shippingRate}</h2>
      <p className="count-text ">Total Shipping</p>
    </div>
  );
}

export default Rate;
