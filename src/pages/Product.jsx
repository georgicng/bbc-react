import Tabs from "../components/Tabs";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import ErrorBanner from "../components/ErrorBanner";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/product";
import { useState } from "react";
import { OPTION_VALUE_MAP, OPTION_KEY_MAP, OPTION_TYPE_MAP } from "../config";

const Title = ({ name, price }) => {
  return (
    <div class="menu-detail offset-lg-2 col-lg-8">
      <div class="menu-title">
        <div class="menu-name">
          <p>Name</p>
          <h3>{name}</h3>
        </div>
        <div class="menu-price">
          <p>Price</p>
          <h3>N{price}</h3>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  //TODO: unselect, validation, increment object map, add to cart, imer
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductQuery({ id });
  const options = product.options.data.map((input) => ({
    id: input.option_id.data.id,
    name: input.option_id.data.slug,
    label: input.option_id.data.name,
    required: input.required,
    maximum: input.maximum,
    minimum: input.minimum,
    increment: input.price_increment,
    type: input.option_id.data.type,
    ...(input.option_id.data.type === OPTION_TYPE_MAP.CHECKBOX
      ? {
          options: input.option_values.data.map((value) => ({
            id: value.option_value.data.id,
            value: value.option_value.data.value,
            label: value.option_value.data.value,
            increment: value.price_increment,
          })),
        }
      : {}),
  }));
  const normalPrice = parseFloat(produuct.price);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(normalPrice);
  const [model, setModel] = useState(
    options.reduce(
      (acc, option) => ({ ...acc, [option.name]: option.options ? [] : "" }),
      {}
    )
  );

  const getOptionIncrement = (option, value) => {
    const candidate = options.find((item) => item.name === option);

    if (!candidate) {
      return 0;
    }

    if (!Array.isArray(value)) {
      return parseFloat(candidate.increment);
    }

    let sum = candidate.options
      .filter((item) => value.includes(item.value))
      .reduce((acc, item) => {
        return (acc += parseFloat(item.increment));
      }, 0);

    if (option === OPTION_VALUE_MAP.FLAVOUR && value?.length > 2) {
      sum += 1000;
    }

    return sum;
  };

  const calculateTotalIncrement = (model) =>
    Object.keys(model).reduce((acc, key) => {
      return (acc += getOptionIncrement(key, model[key]));
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
    //TODO import cart store
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <div id="menu-detail-page">
      <div class="container-fluid">
        <Title name={product.name} price={product.price} />
        <div class="no-back">
          <div class="row">
            <div class="col-sm-12 col-md-6 offset-lg-2 col-lg-4  mb-4">
              <ProductGallery product={product} />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div class="menu-info">
                <div class="form">
                  <ProductOptions
                    options={options}
                    model={model}
                    onChange={handleChange}
                  />
                  <div class="form-group" v-if="multi">
                    <label class="font-weight-bold">Quantity :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label class="font-weight-bold">Total :</label>
                    <span class="price">N{price}</span>
                  </div>
                  <div
                    class="error"
                    v-show="showErrors"
                    v-html="errorMessages"
                  ></div>
                  <button onClick={addToCart} class="btn btn-orange">
                    Add to cart
                    <span>
                      <i class="fa fa-shopping-cart"></i>
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
