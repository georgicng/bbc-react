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

export const getOptions = (product, OPTION_TYPE_MAP) =>
  product.options.data.map((input) => ({
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

export const getOptionIncrementMap = (product) =>
  product.options.data.reduce(
    (acc, input) => ({
      ...acc,
      [input.option_id.data.slug]: input.price_increment,
      ...(input.option_id.data.type === OPTION_TYPE_MAP.CHECKBOX
        ? input.option_values.data.reduce(
            (_acc, value) => ({
              [`${input.option_id.data.slug}.${value.option_value.data.value}`]:
                value.price_increment,
            }),
            {}
          )
        : {}),
    }),
    {}
  );

export const getOptionIncrement = (
  option,
  value,
  options,
  OPTION_VALUE_MAP
) => {
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
