const Heading = ({ title, subtitle }) => {
  return (
    <div className="innerpage-heading">
      <h3>{title}</h3>
      <hr className="page-heading-line" />
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Heading;
