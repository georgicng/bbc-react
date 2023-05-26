import LineOptions from "./LineOptions";
import { getImage } from "../utils";

const CartItem = ({ readonly, line, price, quantity, options, onChange }) => {

  if (readonly) {
    return (
      <div className="order">
        <div className="order-item">
          <div className="order-item-info">
            <h4>{line.name}</h4>
            <div className="d-flex flex-wrap">
              <LineOptions options={options} />
            </div>
          </div>

          <div className="order-item-img">
            <figure>
              <img
                src={getImage(line)}
                className="img-responsive"
                alt={line.name}
              />
            </figure>
          </div>
        </div>

        <div className="total">
          <p>
            {quantity} x N{line.price} = <span>N{price}</span>
          </p>
        </div>
      </div>
    );
  }
  
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
          />
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

      <div className="d-flex flex-column flex-wrap">
        <LineOptions options={options} />
      </div>
      <div className="total">
        Total: <span>N{parseFloat(price) * parseInt(quantity)}</span>
      </div>

      <div className="item-close">
        <button className="btn" onClick={() => onChange("delete")}>
          <span>
            <i className="fa fa-times-circle"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
