const notEmpty = (value) => {
  if (Array.isArray(value) && value.length) {
    return true;
  }

  if (!Array.isArray(value) && value) {
    return true;
  }

  return false;
};

const LineOptions = ({ options }) => {
  return (
    <>
      {Object.entries(options).map(
        ([key, value]) =>
          notEmpty(value) && (
            <div key={key} className="tag d-flex">
              <div>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}:{" "}
              </div>
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
          )
      )}
    </>
  );
};

export default LineOptions;
