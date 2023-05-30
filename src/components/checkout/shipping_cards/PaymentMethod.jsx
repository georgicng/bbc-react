function PaymentMethod({ showError, payment, paymentOptions, onChange }) {
  return (
    <div className={`${showError ? "red" : ""} card my-3`}>
      <div className="card-header">Payment Method</div>
      <div className="card-body">
        {paymentOptions.map((item) => (
          <div className="custom-control custom-radio panel my-3" key={item.id}>
            <input
              type="radio"
              id={item.id}
              value={item.id}
              className="custom-control-input"
              checked={payment === item.id}
              onChange={(e) => onChange("payment", e.target.value)}
            />
            <label
              className="custom-control-label panel-body"
              htmlFor={item.id}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </label>
          </div>
        ))}
      </div>
      {showError && (
        <div className="card-body error">Please select a payment method</div>
      )}
    </div>
  );
}

export default PaymentMethod;
