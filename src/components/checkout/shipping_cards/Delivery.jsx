import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";


function Delivery({ valid, timeOptions, delivery, onChange }) {
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
    date: {
      "ui:autofocus": true,
    },
    time: {
      "ui:options": {
        inputType: "email",
      },
    },
    "ui:submitButtonOptions": {
      norender: true,
    },
  };

  return (
    <div
      className={`${(!valid )? 'red' : ''} card my-3` }
    >
      <div className="card-header">Delivery Day</div>
      <div className="card-body">
        <Form
          formData={delivery}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onChange={onChange}
        />
        <small>For store pickups, you can call in to arrange an earlier time if need be</small>
        {!valid && <div className="error" >Please select a delivery time</div>}
      </div>
    </div>
  );
}

export default Delivery;
