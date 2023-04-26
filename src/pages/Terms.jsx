const Terms = () => {
  const title = "Terms and Conditions";
  const subtitle =
    "Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.";
  const Terms = {
    affordable:
      "We produce quick retail cakes, and the most affordable rates we can possibly offer.",
    flavour:
      "We offer 3 flavours and you may choose two flavours. dditional flavour will incur additional cost.",
    height:
      "All our cakes are 3 inches high except double rate is paid for double height.",
    extra:
      "All extra high cakes will be delivered through uber/taxify     only. You may however pick up from our stores or retail partners, We will not deliver them on bikes.",
    rate: "All are cakes can be delivered door to door at a premium rate based on location and mode of delivery, or picked up from our pick up partners are a subsidized rate usually  N800.",
    pickup:
      "All cakes cake be picked up from our retail partners or our stores for free.",
    temperature:
      "We are buttercream specialists, all our cakes are room temperature stable unless otherwise stated.",
    slb: "Our dessert products are SLB (see, like buy) we do not customize them with designs or decorations, only messages can changed.",
    store:
      "Our dessert cakes are made with whipped cream and must be kept in the fridge.",
    x: "All our products have a shelf life of 48hours inside or outside the fridge pls ensure you keep to this time span for  maximum freshness.",
    care: "We do not take responsibility for products that are damaged after payment has been made and cakes have been received or  picked from our store. pls handle carefully.",
    defect: "We charge for redressing damaged products.",
    return: "Products received in good condition cannot be returned.",
    pod: "We do not accept payment on delivery.",
    delivery:
      "We deliver within a time frame only. between 11am and 1pm / 1pm and 3pm / 3pm and 5pm.",
    close:
      "We do not respond to messages after work hours and on Sundays but you may send your order via our website and we will proceed once we resume work.",
    payment:
      "Full payment is required before we proceed with any transaction our fastest mode of communication is via email and phone calls.",
    report:
      "Please report all unsatisfactory transaction via email at butterbakescakes@gmail.com.",
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="tos-page">
        <div className="container-fluid">
          <div className="innerpage-heading  text-center">
            <h3>{title}</h3>
            <hr className="page-heading-line" />
          </div>
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <p>{subtitle}</p>
                <ul className="term-list">
                  {Object.entries(Terms).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
