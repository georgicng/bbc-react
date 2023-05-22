import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Faq from "./pages/Faq";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Success from "./pages/Success";
import Terms from "./pages/Terms";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/layout/CartDrawer";
import Loader from "./components/layout/Loader";
import BackDrop from "./components/layout/BackDrop";
import Sticky from "./components/layout/Sticky";
import Hero from "./components/layout/Hero";
import SideNav from "./components/layout/SideNav";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, toggleNav } from "./store/commonSlice";

const App = () => {
  const loader = useSelector((state) => state.common.loader);
  const showNav = useSelector((state) => state.common.showNav);
  const showCart = useSelector((state) => state.common.showCart);
  const showCover = useSelector((state) => state.common.showCover);
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();

  return (
    <section className="main">
      <BrowserRouter>
        <SideNav
          showNav={showNav}
          toggle={() => dispatch(toggleNav(!showNav))}
        />
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
          {showCover && <Hero />}
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
      </BrowserRouter>
    </section>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
