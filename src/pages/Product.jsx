import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/products";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../store/commonSlice";
import { add } from "../store/orderSlice";
import { OPTION_KEY_MAP, OPTION_TYPE_MAP } from "../config";
import { getOptions, getOptionIncrement } from "../utils";
import Tabs from "../components/Tabs";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import Title from "../components/Title";
import ErrorBanner from "../components/ErrorBanner";

const transform = (model) =>
  Object.keys(model).reduce((acc, key) => {
    const value = model[key];
    let altValue;

    if (Array.isArray(value)) {
      if (key === OPTION_KEY_MAP.SIZE) {
        altValue = value[0].id;
      } else {
        altValue = value.map((item) => item.id);
      }
    }

    return { ...acc, [key]: altValue ? altValue : value };
  }, {});

const Product = () => {
  //TODO: validation, imer
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error, refetch } = useGetProductQuery(id);

  const [options, setOptions] = useState([]);
  const [normalPrice, setNormalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [valid, setValid] = useState(1);
  const [errorBag, setErrorBag] = useState(1);
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState({});
  const multi = false;

  const calculateTotalIncrement = (model) => {
    return Object.keys(model).reduce((acc, key) => {
      const increment = getOptionIncrement(
        key,
        model[key],
        options,
        OPTION_KEY_MAP
      );
      return (acc += increment);
    }, 0);
  };

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
    let newModel = null;

    if (key === OPTION_KEY_MAP.QUANTITY) {
      setQuantity(value);
    } else {
      newModel = {
        ...model,
        [key]: value,
      };
    }

    if (newModel) {
      setModel(() => newModel);
    }
    setPrice(
      () =>
        (calculateTotalIncrement(transform(newModel ? newModel : model)) +
          normalPrice) *
        quantity
    );
    validate();
  };

  const addToCart = () => {
    dispatch(
      add({ line: product, options: transform(model), quantity, price })
    );
  };

  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (!product) {
      return;
    }
    const optionList = getOptions(product, OPTION_TYPE_MAP);
    setOptions(() => optionList);
    setModel(() =>
      optionList.reduce(
        (acc, option) => ({
          ...acc,
          [option.name]: option.type === OPTION_TYPE_MAP.CHECKBOX ? [] : "",
        }),
        {}
      )
    );
    setNormalPrice(() => parseFloat(product.price));
    setPrice(() => parseFloat(product.price));
  }, [product]);

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  if (!product) {
    return <>Empty</>;
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
