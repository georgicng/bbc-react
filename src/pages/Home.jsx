import { Link } from "react-router-dom";

const Block = ({ path, image, title }) => {
  return (
    <div class="card-banner my-3 col-md-6 offset-lg-2 col-lg-4">
      <Link to={path}>
        <div
          class="card-body"
          style={`height:250px; background-image: url('${image}');`}
        >
          <div class="text-bottom">
            <h2 class="title">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const Blocks = [
    {
      path: "/categories",
      title: "Order a Cake",
      image: "static/images/banners/cake.jpg",
    },
    {
      path: "/terms",
      title: "Terms and Conditions",
      image: "static/images/banners/terms.jpg",
    },
    {
      path: "/complaint",
      title: "Lodge a Complaint",
      image: "static/images/banners/complaint.jpg",
    },
    {
      path: "/contact",
      title: "Contact Us",
      image: "static/images/banners/contact.jpg",
    },
  ];

  return (
    <section class="page-wrapper innerpage-section-padding">
      <div id="home-page">
        <div class="container-fluid">
          <div class="row">
            {Blocks.map((block) => (
              <Block {...block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
