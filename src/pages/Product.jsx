import Tabs from "../components/Tabs";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import ErrorBanner from "../components/ErrorBanner";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/products";
import { add } from "../store/orderSlice";
import { useState } from "react";
import { OPTION_VALUE_MAP, OPTION_KEY_MAP, OPTION_TYPE_MAP } from "../config";
import { getOptions, getOptionIncrement } from "../utils";
import { useDispatch } from "react-redux";

const Title = ({ name, price }) => {
  return (
    <div className="menu-detail offset-lg-2 col-lg-8">
      <div className="menu-title">
        <div className="menu-name">
          <p>Name</p>
          <h3>{name}</h3>
        </div>
        <div className="menu-price">
          <p>Price</p>
          <h3>N{price}</h3>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  //TODO: unselect, validation, add to cart, imer
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductQuery({ id });
  const options = getOptions(product, OPTION_TYPE_MAP);
  const normalPrice = parseFloat(product.price);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(normalPrice);
  const [model, setModel] = useState(
    options.reduce(
      (acc, option) => ({ ...acc, [option.name]: option.options ? [] : "" }),
      {}
    )
  );
  const description = ""; //Generate from model
  const multi = false;

  const calculateTotalIncrement = (model) =>
    Object.keys(model).reduce((acc, key) => {
      return (acc += getOptionIncrement(
        key,
        model[key],
        options,
        OPTION_VALUE_MAP
      ));
    }, 0);

  const handleChange = (key, value) => {
    if (key === OPTION_KEY_MAP.QUANTITY) {
      setQuantity(value);
    } else {
      setModel({
        ...model,
        [key]: Array.isArray(model[key]) ? [...model[key], value] : value,
      });
    }
    setPrice((calculateTotalIncrement() + normalPrice) * quantity);
  };

  const addToCart = () => {
    dispatch(add({ line: { ...product, description }, quantity, price }));
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <div id="menu-detail-page">
      <div className="container-fluid">
        <Title name={product.name} price={product.price} />
        <div className="no-back">
          <div className="row">
            <div className="col-sm-12 col-md-6 offset-lg-2 col-lg-4  mb-4">
              <ProductGallery product={product} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="menu-info">
                <div className="form">
                  <ProductOptions
                    options={options}
                    model={model}
                    onChange={handleChange}
                  />
                  {multi && (
                    <div className="form-group">
                      <label htmlFor="quantity" className="font-weight-bold">
                        Quantity :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="100"
                        value={quantity}
                        onChange={(e) =>
                          handleChange("quantity", e.target.value)
                        }
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <span className="font-weight-bold">Total :</span>
                    <span className="price">N{price}</span>
                  </div>
                  <div className="error">Show error here</div>
                  <button onClick={addToCart} className="btn btn-orange">
                    Add to cart
                    <span>
                      <i className="fa fa-shopping-cart"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Tabs description={product.description} />
        </div>
      </div>
    </div>
  );
};

export default Product;
