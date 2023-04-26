const Coupon = ({ coupon, onClick }) => {
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
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="coupon">Enter Promo Code</label>
            <input
              type="text"
              className="form-control"
              id="coupon"
              value={coupon}
            />
            <button onClick={() => onClick('coupon', coupon)} className="my-3 btn btn-orange">
              Redeem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
