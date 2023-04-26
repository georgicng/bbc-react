import { Link } from "react-router-dom";

const Block = ({ path, image, title }) => {
  return (
    <div className="card-banner my-3 col-md-6 offset-lg-2 col-lg-4">
      <Link to={path}>
        <div
          className="card-body"
          style={`height:250px; background-image: url('${image}');`}
        >
          <div className="text-bottom">
            <h2 className="title">{title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const Blocks = [
    {
      key: "category",
      path: "/categories",
      title: "Order a Cake",
      image: "static/images/banners/cake.jpg",
    },
    {
      key: "term",
      path: "/terms",
      title: "Terms and Conditions",
      image: "static/images/banners/terms.jpg",
    },
    {
      key: "complain",
      path: "/complaint",
      title: "Lodge a Complaint",
      image: "static/images/banners/complaint.jpg",
    },
    {
      key: "contact",
      path: "/contact",
      title: "Contact Us",
      image: "static/images/banners/contact.jpg",
    },
  ];

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="home-page">
        <div className="container-fluid">
          <div className="row">
            {Blocks.map((block) => (
              <Block key={block.key} {...block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
