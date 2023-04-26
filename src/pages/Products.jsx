import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/product";
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
    <div id="menu-page" class="page-wrapper innerpage-section-padding">
      <div class="container text-center menu">
        <div class="innerpage-heading">
          <h3>{title}</h3>
          <hr class="page-heading-line" />
        </div>

        <div id="breakfast-dishes" class="no-back">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
