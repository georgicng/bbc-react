function ShippingMethod({
  valid,
  user,
  shipping,
  express,
  shippingOptions,
  cityShippingMap,
  onChange,
}) {
  if (user.city === "Other" && shipping === "home") {
    return (
      <div className="red card my-3">
        <div className="card-header">Delivery Method</div>
        <div className="card-body">We do not deliver to other states</div>
      </div>
    );
  }

  return (
    <div className={`${!valid && "red"} card my-3`}>
      <div className="card-header">Delivery Method</div>
      {Object.entries(shippingOptions).map(([key, value]) => (
        <div className="card-body" key={key}>
          <h4 className="card-title">{key}</h4>
          {key == "home" ? (
            <>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  value={cityShippingMap[user.city].id}
                  id={cityShippingMap[user.city].id}
                  className="custom-control-input"
                  checked={shipping === cityShippingMap[user.city].id}
                  onChange={(e) => onChange("shipping", e.target.value)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={cityShippingMap[user.city].id}
                >
                  <h4>
                    {cityShippingMap[user.city].title}{" "}
                    <span className="badge">N{cityShippingMap[user.city].cost}</span>
                  </h4>
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="express"
                  checked={express}
                  onChange={(e) => onChange("express", e.target.value)}
                />
                <label className="custom-control-label" htmlFor="express">
                  <h4>
                    Express Delivery <span className="badge">N1000</span>
                  </h4>
                </label>
              </div>
            </>
          ) : (
            value.map((item) => (
              <div className="custom-control custom-radio" key={item.id}>
                <input
                  type="radio"
                  className="custom-control-input"
                  id={item.id}
                  value={item.id}
                  checked={shipping === item.id}
                  onChange={(e) => onChange("shipping", e.target.value)}
                />
                <label className="custom-control-label" htmlFor={item.id}>
                  <h4>
                    {item.title} <span className="badge">N{item.cost}</span>
                  </h4>
                </label>
              </div>
            ))
          )}
        </div>
      ))}
      {!valid && (
        <div className="card-body error">Please select a delivery method</div>
      )}
    </div>
  );
}

export default ShippingMethod;
