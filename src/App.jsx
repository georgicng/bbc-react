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

const App = () => {
  return (
    <section className="main">
      <BrowserRouter>
        <SideNav />
        <CartDrawer />
        <div className="canvas">
          <BackDrop />
          <Header />
          <Sticky />
          <Hero />
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
          <Loader />
        </div>
      </BrowserRouter>
    </section>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
