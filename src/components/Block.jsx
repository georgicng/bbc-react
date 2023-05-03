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

export default Block;
