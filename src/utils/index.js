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
};

export const getOptionIncrement = (
  option,
  value,
  options,
  OPTION_KEY_MAP
) => {
  const candidate = options.find((item) => item.name === option);

  if (!candidate) {
    return 0;
  }

  if (!Array.isArray(value) && option !== OPTION_KEY_MAP.SIZE) {
    return parseFloat(candidate.increment || 0);
  }

  if (option === OPTION_KEY_MAP.SIZE) {
    const optionItem = candidate.options.find((item) => value === item.id);
    return parseFloat(optionItem.increment || 0)
  }

  let sum = candidate.options
    .filter((item) => value.includes(item.value))
    .reduce((acc, item) => {
      return (acc += parseFloat(item.increment || 0));
    }, 0);

  if (option === OPTION_KEY_MAP.FLAVOURS && value.length > 2) {
    sum += 1000;
  }
  return sum;
};
