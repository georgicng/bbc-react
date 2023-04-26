import { Link } from "react-router-dom";
import { getImage, getLink } from "../utils";
import { useGetCategoriesQuery } from "../services/category";
import ErrorBanner from "../components/ErrorBanner";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery(null);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <section class="page-wrapper innerpage-section-padding">
      <div id="categories-page">
        <div class="container" id="categories">
          <div class="row">
            {categories.map((item) => (
              <div key={item.id} class="col-md-6 col-lg-4 col-xl-3 my-3">
                <Link to={getLink(item)}>
                  <div class="card">
                    <img
                      class="w-100"
                      src={getImage(item)}
                      alt="Card image cap"
                    />
                    <div class="btn view-btn">{item.name}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
