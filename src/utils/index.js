import { API_ROOT } from "../config";

export const getImage = (item) => {
  if (item.image) {
    return `${API_ROOT}/${item.image.data.url}`;
  } else {
    return "static/images/no-image.png";
  }
};

export const getLink = (category) => {
  if (category.id == 4) {
    return `/custom`;
  }
  return `/products?category=${category.id}`;
};

export const getOptions = (product, OPTION_TYPE_MAP) => {
  if (!product) {
    return [];
  }
  return product.options.data.map((input) => ({
    id: input.option_id.data.id,
    name: input.option_id.data.slug,
    label: input.option_id.data.name,
    required: input.required,
    maximum: input.maximum,
    minimum: input.minimum,
    increment: input.price_increment,
    type: input.option_id.data.type,
    ...([OPTION_TYPE_MAP.SELECT, OPTION_TYPE_MAP.CHECKBOX].includes(
      input.option_id.data.type
    )
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
};

export const getOptionIncrementMap = (product, OPTION_TYPE_MAP) => {
  if (!product) {
    return {};
  }
  return product.options.data.reduce(
    (acc, input) => ({
      ...acc,
      [input.option_id.data.slug]: input.price_increment,
      ...([OPTION_TYPE_MAP.CHECKBOX, OPTION_TYPE_MAP.SELECT].includes(
        input.option_id.data.type
      )
        ? input.option_values.data.reduce(
            (_acc, value) => ({
              ..._acc,
              [`${input.option_id.data.slug}.${value.option_value.data.id}`]:
                value.price_increment,
            }),
            {}
          )
        : {}),
    }),
    {}
  );
};

export const getOptionIncrement = (
  option,
  value,
  OPTION_INCREMENT_MAP,
  OPTION_KEY_MAP
) => {
  if (!Array.isArray(value) && option !== OPTION_KEY_MAP.SIZE) {
    return parseFloat(OPTION_INCREMENT_MAP[option] || 0);
  }

  if (option === OPTION_KEY_MAP.SIZE) {
    return parseFloat(OPTION_INCREMENT_MAP[`${option}.${value}`] || 0);
  }

  let sum = value.reduce((acc, item) => {
    return (acc += parseFloat(OPTION_INCREMENT_MAP[`${option}.${item}`] || 0));
  }, 0);

  if (option === OPTION_KEY_MAP.FLAVOURS && value.length > 2) {
    sum += 1000;
  }
  return sum;
};

const SHIPPING_TYPES = {
  HOME: 3,
  PARTNER: 2,
  STORE: 1,
};
export const getCityList = (shippingMethods) => {
  if (!shippingMethods || !shippingMethods?.length) {
    return {};
  }

  const cities = shippingMethods
    .filter((item) => item.shipping_method.data.id == SHIPPING_TYPES.HOME)
    .map((item) => item.title);
  cities.push("Other");
  return cities;
};

const shippingIdNameMap = {
  3: "home",
  2: "partner",
  1: "store",
};
export const getShippingList = (shippingMethods) => {
  if (!shippingMethods || !shippingMethods?.length) {
    return {};
  }
  return shippingMethods.reduce((acc, item) => {
    const name = item.shipping_method.data.name;
    const key = shippingIdNameMap[item.shipping_method.data.id];
    return {
      ...acc,
      [key]: {
        ...(acc[key] ? acc[key] : { name }),
        options: [
          ...(acc[key] ? acc[key]["options"] : []),
          { id: item.id, title: item.title, cost: item.cost },
        ],
      },
    };
  }, {});
};

export const getCityShippingMapping = (options) => {
  if (!options || !options?.length) {
    return {};
  }

  return options.reduce((acc, item) => ({ ...acc, [item.title]: item }), {});
};

const paymentIdNameMap = {
  1: "transfer",
  2: "card",
};
export const getPaymentOptions = (paymentMethods) => {
  if (!paymentMethods || !paymentMethods?.length) {
    return [];
  }
  return paymentMethods.map((method) => {
    return {
      id: paymentIdNameMap[method.id],
      name: method.name,
      description: method.description,
      meta: method.settings.data.reduce(
        (acc, item) => ({
          ...acc,
          [item.key]: item.value,
        }),
        {}
      ),
    };
  });
};
