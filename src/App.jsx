import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
import { toggleCart, toggleNav, setPageMeta } from "./store/commonSlice";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/layout/CartDrawer";
import Loader from "./components/layout/Loader";
import BackDrop from "./components/layout/BackDrop";
import Sticky from "./components/layout/Sticky";
import Hero from "./components/layout/Hero";
import SideNav from "./components/layout/SideNav";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Faq from "./pages/Faq";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Success from "./pages/Success";
import Terms from "./pages/Terms";

const App = () => {
  const loader = useSelector((state) => state.common.loader);
  const showNav = useSelector((state) => state.common.showNav);
  const showCart = useSelector((state) => state.common.showCart);
  const pageMeta = useSelector((state) => state.common.pageMeta);
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setPageMeta(location.pathname));
  }, [location]);

  return (
    <section className="main">
      <SideNav showNav={showNav} toggle={() => dispatch(toggleNav(!showNav))} />
      <CartDrawer
        showCart={showCart}
        cart={cart}
        toggle={() => dispatch(toggleCart(!showCart))}
      />
      <div className="canvas">
        <BackDrop />
        <Header cartItemsCount={cart.length} />
        <Sticky
          cartItemsCount={cart.length}
          toggleCart={() => dispatch(toggleCart(true))}
          toggleNav={() => dispatch(toggleNav(true))}
        />
        {pageMeta?.cover && <Hero pageMeta={pageMeta} />}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/success" element={<Success />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
        {loader && <Loader />}
      </div>
    </section>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
