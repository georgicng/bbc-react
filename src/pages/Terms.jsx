import { TERMS } from "../config";

const TITLE = "Terms and Conditions";
const SUBTITLE =
  "Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.";

const Terms = ({ title = TITLE, subtitle = SUBTITLE, terms = TERMS }) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="tos-page">
        <div className="container-fluid">
          <div className="innerpage-heading  text-center">
            <h3>{title}</h3>
            <hr className="page-heading-line" />
          </div>
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <p>{subtitle}</p>
                <ul className="term-list">
                  {Object.entries(terms).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
