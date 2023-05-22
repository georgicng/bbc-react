import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../store/commonSlice";
import { useGetCategoriesQuery } from "../services/category";
import { getImage, getLink } from "../utils";
import { Link } from "react-router-dom";
import ErrorBanner from "../components/ErrorBanner";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [isLoading]);

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="categories-page">
        <div className="container" id="categories">
          <div className="row">
            {categories.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 col-xl-3 my-3">
                <Link to={getLink(item)}>
                  <div className="card">
                    <img
                      className="w-100"
                      src={getImage(item)}
                      alt="Category icon"
                    />
                    <div className="btn view-btn">{item.name}</div>
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
