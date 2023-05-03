const Hero = ({ pageTitle }) => {
  return (
    <div className="page-cover">
      <div className="container-fluid">
        <h3>
          <span className="d-none cover-left-icon float-left">
            <i className="pageIcon"></i>
          </span>
          {pageTitle}
          <span className="d-none cover-right-icon float-right">
            <i className="pageIcon"></i>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Hero;
