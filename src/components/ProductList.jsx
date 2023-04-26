import { Link } from "react-router-dom";
import { getImage } from "../utils";

const ProductList = ({ products }) => {
  return (
    <div class="row">
      {products.map((product) => (
        <div key={product.id} class="col-sm-6 col-md-4 col-lg-3">
          <div class="dish-list my-3">
            <Link to={`/details/${product.id}`}>
              <img src={getImage(product)} class="img-fluid" alt="dish-menu" />
            </Link>
            <div class="dish-list-text">
              <h4>
                <Link to={`/details/${product.id}`}>{product.name}</Link>
              </h4>
              <h5>N{product.price}</h5>
              <Link to={`/details/${product.id}`} class="btn">
                Buy Now
                <span>
                  <i class="fa fa-shopping-cart"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
