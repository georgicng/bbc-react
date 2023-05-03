import LineOptions from "./LineOptions";
import { getImage } from "../utils";

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

      <div className="d-flex flex-wrap">
        <LineOptions options={options} />
      </div>
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

export default CartItem;
