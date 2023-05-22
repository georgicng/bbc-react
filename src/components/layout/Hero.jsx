const Hero = ({ pageMeta}) => {
  return (
    <div className="page-cover">
      <div className="container-fluid">
        <h3>
          <span className="d-none cover-left-icon float-left">
            <i className={pageMeta.icon}></i>
          </span>
          {pageMeta.name}
          <span className="d-none cover-right-icon float-right">
            <i className={pageMeta.icon}></i>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Hero;
