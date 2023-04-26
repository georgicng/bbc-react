import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/products";
import ErrorBanner from "../components/ErrorBanner";
import ProductList from "../components/ProductList";
import { useGetCategoriesQuery } from "../services/category";

const Products = () => {
  const [searchParams] = useSearchParams();
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ category: searchParams.get("category") });
  const { data: categories } = useGetCategoriesQuery(null);
  const title = categories?.find(
    (cat) => cat.id == searchParams.get("category")
  )?.name || searchParams.get("category");

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <div id="menu-page" className="page-wrapper innerpage-section-padding">
      <div className="container text-center menu">
        <div className="innerpage-heading">
          <h3>{title}</h3>
          <hr className="page-heading-line" />
        </div>

        <div id="breakfast-dishes" className="no-back">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
