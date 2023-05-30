import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";

function DeliveryPeriod(
  { showError, timeOptions, delivery, onChange }) {

  const schema = {
    type: "object",
    properties: {
      date: { type: "string", title: "Delivery Date", format: "date" },
      time: {
        type: "string",
        title: "Delivery Time",
        oneOf: timeOptions,
      },
    },
  };

  const uiSchema = {
    "ui:submitButtonOptions": {
      norender: true,
    },
  };

  return (
    <div className={`${showError ? "red" : ""} card my-3`}>
      <div className="card-header">Delivery Day</div>
      <div className="card-body">
        <Form
          formData={delivery}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          showErrorList={false}
          onChange={({ formData }) => onChange("delivery", formData)}
        />
        <small>
          For store pickups, you can call in to arrange an earlier time if need
          be
        </small>
      </div>
      {showError && (
        <div className="card-body error">Please select a delivery date && time</div>
      )}
    </div>
  );
};

export default DeliveryPeriod;
