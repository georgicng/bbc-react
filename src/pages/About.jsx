import { ABOUT_US } from "../config";
import Heading from "../components/Heading";

const TITLE = "About Us";
const SUBTITLE = "Welcome to the world of beautiful buttercream cakes";

const About = ({ title = TITLE, subtitle = SUBTITLE, content = ABOUT_US }) => {
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
