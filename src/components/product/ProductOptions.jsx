import { OPTION_TYPE_MAP } from "../../config";
import Multiselect from "multiselect-react-dropdown";

const ProductOptions = ({ options, model, errors, showError, onChange }) => {
  return (
    <div id="productform">
      {options.map((option) => (
        <div className="form-group" key={option.name} data-option={option.id}>
          {option.type == OPTION_TYPE_MAP.TEXTBOX && (
            <div>
              <label htmlFor={option.id} className="font-weight-bold">
                {option.label}
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
                {option.label}
              </label>
              <Multiselect
                displayValue="label"
                selectedValues={model[option.name]}
                options={option.options}
                isObject={true}
                singleSelect={true}
                onSelect={(selection) => onChange(option.name, selection)}
              ></Multiselect>
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.RADIO && (
            <div>
              <label htmlFor={option.id} className="font-weight-bold">
                {option.label}
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
                {option.label}
              </label>
              <Multiselect
                displayValue="label"
                selectedValues={model[option.name]}
                options={option.options}
                isObject={true}
                showCheckbox={true}
                onSelect={(selection) => onChange(option.name, selection)}
                onRemove={(selection) => onChange(option.name, selection)}
              />
            </div>
          )}

          {option.type == OPTION_TYPE_MAP.TEXTAREA && (
            <div>
              <label htmlFor={option.name} className="font-weight-bold">
                {option.label}
              </label>
              <textarea
                className="form-control"
                id={option.name}
                value={model[option.name]}
                onChange={(e) => onChange(option.name, e.target.value)}
              ></textarea>
            </div>
          )}

          {showError && errors[option.name] && (
            <div className="error d-flex">{errors[option.name][0]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
