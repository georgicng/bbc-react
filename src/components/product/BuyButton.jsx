const BuyButton = ({ onClick }) => {
  return (
    <div>
      <button className="btn  btn-primary" onClick={(e) => onClick(e)}>
        <i className="fa fa-cart-plus"></i> Buy now
      </button>
    </div>
  );
};

export default BuyButton;
