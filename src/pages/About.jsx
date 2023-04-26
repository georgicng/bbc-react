const About = () => {
  const title = "Terms and Conditions";
  const subtitle =
    "Thanks for your interest in butterbakes cakes. Before you proceed with your order we would like you to be familiar with a our processes and mode of operations.";
  const paragrapghs = [
    "We take pride in offering our clients fluffy delicious cakes, adorned with simple but beautiful buttercream frostings and served to you at the most affordable rate we can possibly offer.",
    "WE CHOSE THE SIMPLE LIFE. Having a cake gorgeous cake should be simple too.",
    "Our team of bakers, decorators and service experts are professionally trained to give you the very best experience from cravings to delivery.",
  ];

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="contact-page">
        <div className="container-fluid">
          <div className="innerpage-heading text-center">
            <h3>{title}</h3>
            <hr className="page-heading-line" />
            <p>{subtitle}</p>
          </div>

          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                {paragrapghs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
