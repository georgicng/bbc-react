import { Link } from "react-router-dom";

const MENU = [
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

const SOCIALS = [
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

const SideNav = ({
  socials = SOCIALS,
  menu = MENU,
  logo = "assets/images/logo_icon.png",
  showNav,
  onClick,
}) => {
  return (
    <div className="sidenav-content">
      <div
        id="mySidenav"
        className={`sidenav ${showNav ? "to-left-toggle" : ""} `}
      >
        <div id="web-name">
          <div className="text-center">
            <img src={logo} className="logo" height="100" alt="" />
          </div>
          <ul className="main-menu-social list-inline list-unstyled text-center">
            {socials.map((social) => (
              <li key={social.type} className="list-inline-item">
                <a href={social.link} target="_blank" rel="noreferrer">
                  <span>
                    <i className={`fab ${social.icon}`}></i>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="main-menu">
          <div className="sidenav-closebtn">
            <button
              className="btn btn-default"
              id="sidenav-close"
              onClick={onClick}
            >
              &times;
            </button>
          </div>
          <div className="list-group panel">
            {menu.map((menuItem) =>
              menuItem.children ? (
                <>
                  <a
                    href={`#menu-${menuItem.key}`}
                    className="list-group-item"
                    data-toggle="collapse"
                  >
                    <span>
                      <i className={`${menuItem.icon} sidebar-icon`}></i>
                    </span>
                    {menuItem.name}
                    <span>
                      <i className="fa fa-caret-down arrow"></i>
                    </span>
                  </a>
                  <div
                    className="sub-menu collapse"
                    id={`menu-${menuItem.key}`}
                    data-parent="#main-menu"
                  >
                    {menuItem.children.map((subMenu) => (
                      <Link
                        key={subMenu.key}
                        to={subMenu.path}
                        className="list-group-item"
                      >
                        {subMenu.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  key={menuItem.key}
                  to={menuItem.path}
                  className="list-group-item"
                >
                  <span>
                    <i className={`${menuItem.icon} sidebar-icon`}></i>
                  </span>{" "}
                  {menuItem.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
