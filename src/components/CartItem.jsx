const CartItem = (props) => {
  const { product, price, quantity, options } = props;

  const getImage = (product) => {
    if (product.image) {
      return `${API_ROOT}${product.image.data.url}`;
    } else {
      return "static/images/no-image.png";
    }
  };
  const remove = () => {
    this.$store.commit(REMOVE_FROM_CART, this.index);
  };

  const update = () => {
    if (!this.quantity) {
      this.quantity = 1;
    }
    this.$store.commit(UPDATE_CART, {
      index: this.index,
      quantity: this.quantity,
    });
  };

  const getOptionDetails = (product, options) => {
    return this.$store.getters.optionDescription(product, options);
  };

  return (
    <div className="cart-item">
      <div className="item-text dish-list-text">
        <h4>
          <a href="#">{product.name}</a>
        </h4>
        <h5>
          Qty:{" "}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={() => update()}
            className="form-control"
          />{" "}
          x N{line.price}
        </h5>
      </div>

      <div className="item-img">
        <a href="#">
          <img
            src={getImage(product)}
            className="img-responsive"
            alt={product.name}
          />
        </a>
      </div>

      <div className="d-flex flex-wrap">
        {getOptionDetails(product, options)}
      </div>
      <h4 className="total">
        Total: <span>N{price}</span>
      </h4>

      <div className="item-close">
        <button className="btn" onClick={() => remove()}>
          <span>
            <i className="fa fa-times-circle"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
