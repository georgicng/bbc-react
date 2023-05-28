const Coupon = ({ coupon, addCoupon }) => {
  //TODO: implement local state for coupon uncontrolled form
  return (
    <div className="card coupon">
      <div className="card-header" id="headingOne">
        <a
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          I have Promo Code
        </a>
      </div>
      <div className="collapse" id="collapseExample">
        <form
          className="card-body"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            addCoupon(formData.get("coupon"));
          }}
        >
          <div className="form-group">
            <label htmlFor="coupon">Enter Promo Code</label>
            <input
              type="text"
              name="coupon"
              className="form-control"
              id="coupon"
              value={coupon}
            />
            <button className="my-3 btn btn-orange">Redeem</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
