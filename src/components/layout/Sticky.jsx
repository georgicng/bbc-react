import { Link } from "react-router-dom";

const Sticky = ({
  logo = "assets/images/logo_text.png",
  height = "45",
  cartItemsCount,
  toggleNav,
  toggleCart
}) => {
  return (
    <div className="header d-lg-none">
      <div className="fixed-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col d-flex justify-content-start align-items-center">
              <div className="header-links">
                <button id="sidenav-open" className="btn-link" onClick={toggleNav}>
                  <span>
                    <i className="fa fa-bars"></i>
                  </span>
                </button>
              </div>
            </div>

            <div className="col">
              <div className="header-logo f-none text-center">
                <Link to="/">
                  <img className="logo" src={logo} height={height} alt="" />
                </Link>
              </div>
            </div>

            <div className="col d-flex justify-content-end align-items-center">
              <div className="header-links">
                <button id="shc-side-open"className="btn-link" onClick={toggleCart}>
                  <span>
                    <i className="fa fa-shopping-cart"></i>
                  </span>
                  <span className="cart-badge">{cartItemsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticky;
