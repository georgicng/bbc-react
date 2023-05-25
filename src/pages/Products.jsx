import useLoader from "../hooks/useLoader";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/products";
import { useGetCategoriesQuery } from "../services/products";
import ReactPaginate from "react-paginate";
import Heading from "../components/Heading";
import ErrorBanner from "../components/ErrorBanner";
import ProductList from "../components/ProductList";

const Products = () => {
  const [searchParams] = useSearchParams();
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ category: searchParams.get("category") });  
  useLoader(isLoading);

  const { data: categories } = useGetCategoriesQuery(null);  

  const title =
    categories?.find((cat) => cat.id == searchParams.get("category"))?.name ||
    searchParams.get("category");

  const handlePageClick = () => {
    // TODO: call endpoint
    console.log("page clicked");
  };

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <div id="menu-page" className="page-wrapper innerpage-section-padding">
      <div className="container text-center menu">
        <Heading title={title} />
        <div id="breakfast-dishes" className="no-back">
          <ProductList products={data?.items || []} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={2}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
