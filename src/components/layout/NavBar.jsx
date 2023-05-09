import { Link } from "react-router-dom";
import { MENU } from "../../config";

const NavBar = ({ menu = MENU, cartItemsCount = 0 }) => {
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
