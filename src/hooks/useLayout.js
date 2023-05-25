import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleCart, toggleNav, setPageMeta } from "../store/layoutSlice";

const useLayout = () => {
  const loader = useSelector((state) => state.layout.loader);
  const showNav = useSelector((state) => state.layout.showNav);
  const showCart = useSelector((state) => state.layout.showCart);
  const pageMeta = useSelector((state) => state.layout.pageMeta);

  const dispatch = useDispatch();
  const displayCart = (payload) => {
    dispatch(toggleCart(payload))
  }
  const displayNav = (payload) => {
    dispatch(toggleNav(payload))
  }
  const location = useLocation();
  useEffect(() => {
    dispatch(setPageMeta(location.pathname));
  }, [location]);

  return {
    loader,
    showNav,
    showCart,
    pageMeta,
    displayCart,
    displayNav
  };
};

export default useLayout;
