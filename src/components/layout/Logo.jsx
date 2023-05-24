const Logo = ({ logo = "/assets/images/logo.png", height = "100" }) => {
  return (
    <div className="logo-area">
      <div className="container">
        <div className="logo_wrapper">
          <div className="logo">
            <a href="index.html">
              <img src={logo} className="logo" height={height} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
