import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoader } from "../store/commonSlice";
import { add } from "../store/orderSlice";
import { OPTION_KEY_MAP, OPTION_TYPE_MAP } from "../config";
import {
  getOptions,
  getOptionIncrement,
  getOptionIncrementMap,
} from "../utils";
import Tabs from "../components/Tabs";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import Title from "../components/Title";
import ErrorBanner from "../components/ErrorBanner";

const transform = (model, key = "id") =>
  Object.keys(model).reduce((acc, _key) => {
    let value = model[_key];

    if (Array.isArray(value)) {
      if (key === OPTION_KEY_MAP.SIZE) {
        value = value[0][key];
      } else {
        value = value.map((item) => item[key]);
      }
    }

    return { ...acc, [_key]: value };
  }, {});

const Product = () => {
  //TODO: validation, imer
  const multi = false;
  const [options, setOptions] = useState([]);
  const [incrementMap, setIncrementMap] = useState({});
  const [normalPrice, setNormalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [valid, setValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pristine, setPristine] = useState(true);
  const [errorBag, setErrorBag] = useState({});
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState({});
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductQuery(id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (!product) {
      return;
    }
    const sortArray = Object.values(OPTION_KEY_MAP);
    const optionList = getOptions(product, OPTION_TYPE_MAP).sort(
      (a, b) => sortArray.indexOf(a.name) - sortArray.indexOf(b.name)
    );
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
    setIncrementMap(() => getOptionIncrementMap(product, OPTION_TYPE_MAP));
  }, [product]);

  const validate = (model) => {
    const _errorBag = {};
    options.forEach((option) => {
      if (option.required) {
        if (
          [OPTION_TYPE_MAP.CHECKBOX, OPTION_TYPE_MAP.SELECT].includes(
            option.type
          ) &&
          !model[option.name].length
        ) {
          _errorBag[option.name] = [`${option.name} cannot be empty`];
        } else if (!model[option.name]) {
          _errorBag[option.name] = [`${option.name} is required`];
        }
      }

      if (option.maximum) {
        if (model[option.name]?.length > option.maximum) {
          _errorBag[option.name] = [
            ...(_errorBag[option.name] ? _errorBag[option.name] : []),
            `${option.name} exceeds ${option.maximum}`,
          ];
        }
      }

      if (option.minimum) {
        if (model[option.name]?.length < option.minimum) {
          _errorBag[option.name] = [
            ...(_errorBag[option.name] ? _errorBag[option.name] : []),
            `${option.name} is lesser than ${option.minimum}`,
          ];
        }
      }
    });
    if (multi && !quantity) {
      _errorBag["quantity"] = `Please specify the quantity`;
    }
    setValid(() => !Object.keys(_errorBag).length);
    setErrorBag(() => _errorBag);
  };

  const calculateTotalIncrement = (model) => {
    return Object.keys(model).reduce((acc, key) => {
      const increment = getOptionIncrement(
        key,
        model[key],
        incrementMap,
        OPTION_KEY_MAP
      );
      return (acc += increment);
    }, 0);
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

    newModel && setModel(() => newModel);

    setPrice(
      () =>
        (calculateTotalIncrement(transform(newModel || model)) + normalPrice) *
        quantity
    );

    validate(newModel || model);
    pristine && setPristine(() => false);
  };

  const navigate = useNavigate();
  const addToCart = () => {
    if (!valid) {
      pristine && validate(model);
      setShowError(() => true);
      return;
    }
    dispatch(
      add({
        line: product,
        options: transform(model, "label"),
        quantity,
        price,
      })
    );
    navigate("/cart");
  };

  if (!product) {
    return <>Empty</>;
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
                    errors={errorBag}
                    showError={showError}
                    onChange={handleChange}
                  />
                  {multi && (
                    <div className="form-group">
                      <div>
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
                      {showError && errorBag[OPTION_KEY_MAP.QUANTITY] && (
                        <div className="error d-flex">
                          {errorBag[OPTION_KEY_MAP.QUANTITY][0]}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <span className="font-weight-bold">Total:</span>{" "}
                    <span className="price">N{price}</span>
                  </div>
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
