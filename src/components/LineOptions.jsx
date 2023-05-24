const LineOptions = ({ options }) => {
  return (
    <>
      {Object.entries(options).map(([key, value]) => (
        <div key={key} className="tag d-flex">
          <div>{key}:{" "}</div>
          {Array.isArray(value) ? (
            <div className="tag-group d-flex">
              {value.map((item) => (
                <div key={item} className="tag-item">
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div className="tag-item">{value}</div>
          )}
        </div>
      ))}
    </>
  );
};

export default LineOptions;
