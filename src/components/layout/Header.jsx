import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Logo from "./Logo";

const Header = ({ cartItemsCount }) => {
  return (
    <div className="header-lg d-none d-lg-block border-bottom">
      <Logo />
      <TopBar />
      <NavBar cartItemsCount={cartItemsCount} />
    </div>
  );
};

export default Header;
