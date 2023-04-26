import { OPTION_TYPE_MAP } from "../config";

const ProductOptions = ({ options, model, onChange }) => {
  return (
    <form id="productform">
      {options.map((option) => (
        <div className="form-group" key={option.name} data-option={option.id}>
          {option.type == OPTION_TYPE_MAP.TEXTBOX && (
            <div>
              <label htmlFor={option.id} className="font-weight-bold">
                {option.name}
              </label>

              <input
                type="text"
                className="form-control"
                name={option.name}
                id={option.id}
                value={model[option.name]}
                maxLength={option.maximum || null}
                onChange={(e) => onChange(option.name, e.target.value)}
              />
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.SELECT && (
            <div>
              <label htmlFor={option.name} className="font-weight-bold">
                {option.name}
              </label>
              <multiselect
                track-by="id"
                label="name"
                selectLabel="Click to select"
                deselectLabel="Click to remove"
                value={model[option.name]}
                options={option.options}
                searchable="false"
                onChange={(e) => onChange(option.name, e.target.value)}
              ></multiselect>
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.RADIO && (
            <div>
              <label htmlFor={option.id} className="font-weight-bold">
                {option.name}
              </label>
              {option.options.map((value) => (
                <div className="custom-control custom-radio" key={value.id}>
                  <input
                    type="radio"
                    className="custom-control-input"
                    name={option.name}
                    id={value.id}
                    value={value.value}
                    onChange={(e) => onChange(option.name, e.target.value)}
                  />
                  <label className="custom-control-label" htmlFor={value.id}>
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.CHECKBOX && (
            <div>
              <label htmlFor={option.name} className="font-weight-bold">
                {option.name}
              </label>
              <multiselect
                multiple="true"
                track-by="id"
                label="name"
                id={option.name}
                selectLabel="Click to select"
                deselectLabel="Click to remove"
                max={option.maximum}
                value={model[option.name]}
                options={option.options}
                searchable="false"
                onChange={(e) => onChange(option.name, e.target.value)}
              />
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.TEXTAREA && (
            <div>
              <label htmlFor={option.name} className="font-weight-bold">
                {option.name}
              </label>
              <textarea
                className="form-control"
                id={option.name}
                value={model[option.name]}
                onChange={(e) => onChange(option.name, e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      ))}
    </form>
  );
};

export default ProductOptions;
