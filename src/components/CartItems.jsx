import { getImage } from "../utils";

const LineOptions = ({ options }) => {
  return (
    <>
      {Object.entries(options).map(([key, value]) => (
        <div className="tag">
          {key}:
          {Array.isArray(value) ? (
            value.map((item) => <div className="tagItem">{item}</div>)
          ) : (
            <div className="tagItem">{value}</div>
          )}
        </div>
      ))}
    </>
  );
};

const CartItem = ({ line, price, quantity, options, onChange }) => {
  return (
    <div className="cart-item">
      <div className="item-text dish-list-text">
        <div>{line.name}</div>
        <div>
          <label htmlFor="quantity">Qty:</label>
          <input
            type="number"
            min="1"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => onChange("update", e.target.value)}
            className="form-control"
          />{" "}
          x N{price}
        </div>
      </div>

      <div className="item-img">
        <figure>
          <img
            src={getImage(line)}
            className="img-responsive"
            alt={line.name}
          />
        </figure>
      </div>

      <div className="d-flex flex-wrap"><LineOptions options={options} /></div>
      <div className="total">
        Total: <span>N{price}</span>
      </div>

      <div className="item-close">
        <button className="btn" onClick={() => onChange("remove", line.id)}>
          <span>
            <i className="fa fa-times-circle"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

const CartItems = ({ cart, onChange }) => {
  return (
    <ul className="list-unstyled cart-list">
      {cart.map((item) => (
        <li key="index">
          <CartItem {...item} onChange={onChange} />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
