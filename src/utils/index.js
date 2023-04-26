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