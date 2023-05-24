import { SIZES } from "../config";

const Tabs = ({ description }) => {
  /* 
  const tabs = [
    { key: "description", title: "Description" },
    { key: "size", title: "Size Examples" },
  ]; */

  return (
    <div className="row my-4">
      <div className="offset-lg-2 col-lg-8">
        <ul className="nav nav-tabs justify-content-start">
          {description && (
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#description"
                data-toggle="tab"
              >
                Description
              </a>
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link" href="#size" data-toggle="tab">
              Size Examples
            </a>
          </li>
        </ul>

        <div className="tab-content">
          {description && (
            <div id="description" className="tab-pane active">
              <div
                className="my-4"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          )}
          <div id="size" className={`tab-pane ${description ? "" : "active"}`}>
            <div
              id="img-tab"
              className="nav nav-pills my-4 justify-content-center"
              role="tablist"
            >
              {SIZES.map((size, index) => (
                <a
                  key={size.id}
                  href={`#${size.id}`}
                  className={`nav-item nav-link ${index === 0 ? "active" : ""}`}
                  data-toggle="tab"
                  role="tab"
                >
                  {size.label}
                </a>
              ))}
            </div>
            <div className="tab-content my-5">
              {SIZES.map((size, index) => (
                <div
                  key={size.id}
                  className={`tab-pane ${index === 0 ? "active" : ""}`}
                  id={size.id}
                  role="tabpanel"
                >
                  <img
                    className="img-fluid"
                    src={size.image}
                    alt="size diagram"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
