import { TERMS } from "../config";
import Heading from "../components/Heading";

const TITLE = "Terms and Conditions";
const SUBTITLE =
  "Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.";

const Terms = ({ title = TITLE, subtitle = SUBTITLE, terms = TERMS }) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="tos-page">
        <div className="container-fluid">
          <Heading title={title} subtitle={subtitle} />

          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
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
