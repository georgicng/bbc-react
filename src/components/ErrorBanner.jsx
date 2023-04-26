const ErrorBanner = ({ error, refetch }) => {
  return (
    <section class="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 offset-lg-2 col-lg-8">
              <div class="jumbotron text-center mt-4">
                <h1 class="display-4">Oops!</h1>
                <p class="lead">{error.title}</p>
                <hr class="my-4" />
                <p>{error.message}</p>
                <p class="lead">
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
