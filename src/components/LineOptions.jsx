const LineOptions = ({ options }) => {
  return (
    <>
      {Object.entries(options).map(([key, value]) => (
        <div key={key} className="tag">
          {key}:
          {Array.isArray(value) ? (
            value.map((item) => (
              <div key={item} className="tagItem">
                {item}
              </div>
            ))
          ) : (
            <div className="tagItem">{value}</div>
          )}
        </div>
      ))}
    </>
  );
};

export default LineOptions;
