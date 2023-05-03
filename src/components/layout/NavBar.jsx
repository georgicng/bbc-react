import { Link } from "react-router-dom";

const MENU = [
  {
    key: "home",
    path: "/",
    name: "Home",
  },
  {
    key: "products",
    path: "#",
    name: "Products",
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
  { key: "about", path: "/about", name: "About" },
  { key: "contact", path: "/contact", name: "Contact" },
  { key: "complaint", path: "/complaint", name: "Support" },
  { key: "faq", path: "/faq", name: "FAQ" },
  { key: "terms", path: "/terms", name: "Terms" },
];

const NavBar = ({ menu = MENU, cartItemsCount }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <nav className="navbar navbar-expand" role="navigation">
            <ul className="navbar-nav lg-menu">
              {menu.map((menuItem) => (
                <li key={menuItem.key} className="nav-item">
                  {menuItem.children ? (
                    <>
                      <a
                        href="/"
                        className="nav-link dropdown-toggle"
                        id={`${menuItem.key}MenuLink`}
                        data-toggle="dropdown"
                      >
                        {menuItem.name}
                      </a>
                      <div className="dropdown-menu">
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
                    <Link to={menuItem.path} className="nav-link">
                      {menuItem.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-lg-2">
          <div className="search-right text-right">
            <div className="cart box_1">
              <Link to="/cart">
                <i className="fa fa fa-shopping-basket"></i>
                <span className="cart-badge">{cartItemsCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
