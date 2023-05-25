import { Link } from "react-router-dom";

const Checkout = ({
  title = "Thank You!",
  subtitle = "Your order has been recorded",
}) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="contact-page">
        <div className="container text-center">
          <div className="innerpage-heading">
            <div className="jumbotron text-xs-center">
              <h1 className="display-3">{title}</h1>
              <p className="lead">
                <strong>{subtitle}</strong> .
              </p>
              <hr />
              <p>
                Having trouble? <Link to="/complaint">Contact us</Link>
              </p>
              <p className="lead">
                <Link to="/" className="btn btn-primary btn-sm" role="button">
                  Continue to homepage
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
