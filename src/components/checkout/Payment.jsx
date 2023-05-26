function Payment({ payment, bank }) {
  return (
    <>
      {payment == "card" && (
        <div className="jumbotron">
          <h1 className="display-4">Complete Order</h1>
          <p className="lead">We need to confirm your Order.</p>
          <hr className="my-4" />
          <p>
            Please click on the <strong>Finish Button</strong> below to initiate
            payment online and complete the transaction.
          </p>
          {/*
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
          */}
        </div>
      )}
      {payment == "transfer" && (
        <div className="jumbotron">
          <h1 className="display-4">Complete Order</h1>
          <p className="lead">We need to confirm your Order.</p>
          <hr className="my-4" />
          <p>
            Find our bank transfer details below and click on the{" "}
            <strong>Finish Button</strong> below to complete the transaction.
          </p>
          <div className="bank-message">{bank}</div>
          {/*
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
          */}
        </div>
      )}
    </>
  );
}

export default Payment;
