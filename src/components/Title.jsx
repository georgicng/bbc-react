const Title = ({ name, price }) => {
    return (
      <div className="menu-detail offset-lg-2 col-lg-8">
        <div className="menu-title">
          <div className="menu-name">
            <p>Name</p>
            <h3>{name}</h3>
          </div>
          <div className="menu-price">
            <p>Price</p>
            <h3>N{price}</h3>
          </div>
        </div>
      </div>
    );
  };

  export default Title;