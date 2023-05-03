import Heading from "../components/Heading";
import { ABOUT_US } from "../config";

const TITLE = "Terms and Conditions";
const SUBTITLE =
  "Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.";

const About = ({
  title = TITLE,
  subtitle = SUBTITLE,
  content = ABOUT_US,
}) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="contact-page">
        <div className="container-fluid">
          <Heading title={title} subtitle={subtitle} />

          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                {content.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
