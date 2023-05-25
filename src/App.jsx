import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import useCart from "./hooks/useCart";
import useLayout from "./hooks/useLayout";
import { store } from "./store/store";
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
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Checkout from "./pages/Checkout";

const App = () => {
  const { loader, showNav, showCart, pageMeta, displayCart, displayNav } = useLayout();
  const { cart, subtotal, total, discount, cartAction } = useCart();

  return (
    <section className="main">
      <SideNav showNav={showNav} toggle={() => displayNav(!showNav)} />
      <CartDrawer
        showCart={showCart}
        cart={cart}
        discount={discount}
        subtotal={subtotal}
        total={total}
        onChange={cartAction}
        toggle={() => displayCart(!showCart)}
      />
      <div className="canvas">
        <BackDrop />
        <Header cartItemsCount={cart.length} />
        <Sticky
          cartItemsCount={cart.length}
          toggleCart={() => displayCart(true)}
          toggleNav={() => displayNav(true)}
        />
        {pageMeta?.cover && <Hero pageMeta={pageMeta} />}
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/details/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/support" element={<Support />} />
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
