const ErrorBanner = ({ error, refetch }) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 offset-lg-2 col-lg-8">
              <div className="jumbotron text-center mt-4">
                <h1 className="display-4">Oops!</h1>
                <p className="lead">{error.title}</p>
                <hr className="my-4" />
                <p>{error.message}</p>
                <p className="lead">
                  <button onClick={refetch}>Try again</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorBanner;
