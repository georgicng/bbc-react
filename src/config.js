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
    image: "assets/images/examples/6-inches.jpg",
  },
  {
    id: "inches-8",
    label: "8 Inches",
    image: "assets/images/examples/8-inches.jpg",
  },
  {
    id: "inches-10",
    label: "10 Inches",
    image: "assets/images/examples/10-inches.jpg",
  },
  {
    id: "inches-12",
    label: "12 Inches",
    image: "assets/images/examples/12-inches.jpg",
  },
];

export const BLOCKS = [
  {
    key: "category",
    path: "/categories",
    title: "Order a Cake",
    image: "assets/images/banners/cake.jpg",
  },
  {
    key: "term",
    path: "/terms",
    title: "Terms and Conditions",
    image: "assets/images/banners/terms.jpg",
  },
  {
    key: "complain",
    path: "/complaint",
    title: "Lodge a Complaint",
    image: "assets/images/banners/complaint.jpg",
  },
  {
    key: "contact",
    path: "/contact",
    title: "Contact Us",
    image: "assets/images/banners/contact.jpg",
  },
];

export const CONTACTS = [
  {
    icon: "fa-phone",
    type: "phone",
    link: "tel:+2348149750282",
    value: "+2348149750282",
  },
  {
    icon: "fa-envelope",
    type: "email",
    link: "mailto:butterbakescakes@gmail.com",
    value: "butterbakescakes@gmail.com",
  },
];

export const SOCIALS = [
  {
    icon: "fa-facebook-f",
    type: "facebook",
    link: "#",
  },
  {
    icon: "fa-instagram",
    type: "instagram",
    link: "//instagram.com/butterbakesng",
  },
  {
    icon: "fa-twitter",
    type: "twitter",
    link: "#",
  },
  {
    icon: "fa-google-plus-g",
    type: "google-plus",
    link: "#",
  },
];

export const MENU = [
  {
    key: "home",
    path: "/",
    name: "Home",
    icon: "fa fa-home",
  },
  {
    key: "products",
    path: "#",
    name: "Products",
    icon: "fas fa-shopping-bag",
    children: [
      {
        key: "all-products",
        path: "/products",
        name: "All Products",
      },
      {
        key: "categories",
        path: "/categories",
        name: "All Categories",
      },
      {
        key: "category-1",
        path: "/products?category=1",
        name: "Buttercream Cakes",
      },
      {
        key: "category-3",
        path: "/products?category=3",
        name: "Cakes for Kids",
      },
      { key: "category-5", path: "/products?category=5", name: "Cream Cakes" },
      { key: "custom", path: "/custom", name: "Quick Order Cakes" },
    ],
  },
  { key: "about", path: "/about", name: "About", icon: "fas fa-users" },
  {
    key: "contact",
    path: "/contact",
    name: "Contact",
    icon: "fas fa-envelope",
  },
  {
    key: "complaint",
    path: "/complaint",
    name: "Support",
    icon: "fa fa-life-ring",
  },
  { key: "faq", path: "/faq", name: "FAQ", icon: "fas fa-question-circle" },
  { key: "terms", path: "/terms", name: "Terms", icon: "far fa-handshake" },
];

export const TERMS = {
  affordable:
    "We produce quick retail cakes, and the most affordable rates we can possibly offer.",
  flavour:
    "We offer 3 flavours and you may choose two flavours. dditional flavour will incur additional cost.",
  height:
    "All our cakes are 3 inches high except double rate is paid for double height.",
  extra:
    "All extra high cakes will be delivered through uber/taxify     only. You may however pick up from our stores or retail partners, We will not deliver them on bikes.",
  rate: "All are cakes can be delivered door to door at a premium rate based on location and mode of delivery, or picked up from our pick up partners are a subsidized rate usually  N800.",
  pickup:
    "All cakes cake be picked up from our retail partners or our stores for free.",
  temperature:
    "We are buttercream specialists, all our cakes are room temperature stable unless otherwise stated.",
  slb: "Our dessert products are SLB (see, like buy) we do not customize them with designs or decorations, only messages can changed.",
  store:
    "Our dessert cakes are made with whipped cream and must be kept in the fridge.",
  x: "All our products have a shelf life of 48hours inside or outside the fridge pls ensure you keep to this time span for  maximum freshness.",
  care: "We do not take responsibility for products that are damaged after payment has been made and cakes have been received or  picked from our store. pls handle carefully.",
  defect: "We charge for redressing damaged products.",
  return: "Products received in good condition cannot be returned.",
  pod: "We do not accept payment on delivery.",
  delivery:
    "We deliver within a time frame only. between 11am and 1pm / 1pm and 3pm / 3pm and 5pm.",
  close:
    "We do not respond to messages after work hours and on Sundays but you may send your order via our website and we will proceed once we resume work.",
  payment:
    "Full payment is required before we proceed with any transaction our fastest mode of communication is via email and phone calls.",
  report:
    "Please report all unsatisfactory transaction via email at butterbakescakes@gmail.com.",
};

export const ABOUT_US = [
  "We take pride in offering our clients fluffy delicious cakes, adorned with simple but beautiful buttercream frostings and served to you at the most affordable rate we can possibly offer.",
  "WE CHOSE THE SIMPLE LIFE. Having a cake gorgeous cake should be simple too.",
  "Our team of bakers, decorators and service experts are professionally trained to give you the very best experience from cravings to delivery.",
];