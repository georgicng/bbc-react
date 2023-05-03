import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/products";
import ErrorBanner from "../components/ErrorBanner";
import ProductList from "../components/ProductList";
import { useGetCategoriesQuery } from "../services/category";
import ReactPaginate from "react-paginate";
import Heading from "../components/Heading";

const Products = () => {
  const [searchParams] = useSearchParams();
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ category: searchParams.get("category") });
  const { data: categories } = useGetCategoriesQuery(null);
  const title =
    categories?.find((cat) => cat.id == searchParams.get("category"))?.name ||
    searchParams.get("category");

  const handlePageClick = () => {
    // TODO: call endpoint
    console.log("page clicked");
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <div id="menu-page" className="page-wrapper innerpage-section-padding">
      <div className="container text-center menu">
        <Heading title={title} />
        <div id="breakfast-dishes" className="no-back">
          <ProductList products={products} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
