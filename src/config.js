export const API_BASE = process.env.API_BASE;
export const API_ROOT = process.env.API_ROOT;
export const TOKEN = process.env.TOKEN;
export const API_PREFIX = process.env.API_ENDPOINT_PREFIX;
export const API_ENDPOINT_PREFIX = process.env.API_ENDPOINT_PREFIX;
export const API_ENDPOINT_SUFFIX = process.env.API_ENDPOINT_SUFFIX;
export const PAGE_SIZE = 20;
export const DEPTH_SIZE = 3;
export const CUSTOM_PRODUCT_ID = 12;

export const OPTION_VALUE_MAP = Object.freeze({
  FLAVOUR: "flavour",
});

export const OPTION_KEY_MAP = Object.freeze({
  QUANTITY: "quantity",
});

export const OPTION_TYPE_MAP = Object.freeze({
  CHECKBOX: "checkbox",
  SELECT: "select",
  TEXTBOX: "textbox",
  RADIO: "radio",
  TEXTAREA: "textarea",
});

export const SIZES = [
  {
    id: "inches-6",
    label: "6 Inches",
    image: "static/images/examples/6-inches.jpg",
  },
  {
    id: "inches-8",
    label: "8 Inches",
    image: "static/images/examples/8-inches.jpg",
  },
  {
    id: "inches-10",
    label: "10 Inches",
    image: "static/images/examples/10-inches.jpg",
  },
  {
    id: "inches-12",
    label: "12 Inches",
    image: "static/images/examples/12-inches.jpg",
  },
];
