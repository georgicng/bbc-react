import { getImage } from "../utils";

const ProductGallery = ({ product }) => {
  return (
    <ul
      id="menu-gallery"
      className="gallery list-unstyled cS-hidden menu-gallery text-center"
    >
      <li data-thumb={getImage(product)}>
        <div className="p-img">
          <img src={getImage(product)} alt={product.name} />
        </div>
      </li>
    </ul>
  );
};

export default ProductGallery;
