import Tabs from "../components/Tabs";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import Title from "../components/Title";
import ErrorBanner from "../components/ErrorBanner";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../store/commonSlice";
import { add } from "../store/orderSlice";
import { OPTION_VALUE_MAP, OPTION_KEY_MAP, OPTION_TYPE_MAP } from "../config";
import { getOptions, getOptionIncrement } from "../utils";

const Product = () => {
  //TODO: validation, imer
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
  const [valid, setValid] = useState(1);
  const [errorBag, setErrorBag] = useState(1);
  const [price, setPrice] = useState(normalPrice);
  const [model, setModel] = useState(
    options.reduce(
      (acc, option) => ({ ...acc, [option.name]: option.options ? [] : "" }),
      {}
    )
  );
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

  const validate = () => {
    //TODO: polpulate error bag
    let valid = true;
    let errorBag = "";
    if (options) {
      options.forEach((option) => {
        if (option.required && !model[option.slug]) {
          if (
            option.type == OPTION_TYPE_MAP.CHECKBOX &&
            model[option.slug].lenght > 0
          ) {
            console.log();
          }
          valid = false;
          errorBag += `Please specify a ${option.name}<br>`;
        }
      });
      if (multi && !quantity) {
        valid = false;
        errorBag += `Please specify the quantity<br>`;
      }
    }
    setValid(valid);
    setErrorBag(errorBag);
  };

  const handleChange = (key, value) => {
    if (key === OPTION_KEY_MAP.QUANTITY) {
      setQuantity(value);
    } else {
      setModel({
        ...model,
        // NOTE: for multiple option items, send collection and not individual items to avoid need for mutaion
        [key]: value,
      });
    }
    setPrice((calculateTotalIncrement() + normalPrice) * quantity);
    validate();
  };

  const addToCart = () => {
    dispatch(add({ line: product, options: model, quantity, price }));
  };

  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [isLoading]);

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
