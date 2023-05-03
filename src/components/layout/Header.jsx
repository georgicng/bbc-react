import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="header-lg d-none d-lg-block border-bottom">
      <Logo />
      <TopBar />
      <NavBar />
    </div>
  );
};

export default Header;
