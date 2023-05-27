import { useRef, forwardRef, useImperativeHandle } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";

const DeliveryPeriod = forwardRef(function DeliveryPeriod(
  { valid, timeOptions, delivery, onChange },
  ref
) {
  const formRef = useRef();

  useImperativeHandle(
    ref, // forwarded ref
    function () {
      return {
        validate() {
          return formRef.current.validateForm();
        },
      }; // the forwarded ref value
    },
    []
  );
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
    <div className={`${!valid ? "red" : ""} card my-3`}>
      <div className="card-header">Delivery Day</div>
      <div className="card-body">
        <Form
          ref={formRef}
          formData={delivery}
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onChange={({ formData }) => onChange("delivery", formData)}
        />
        <small>
          For store pickups, you can call in to arrange an earlier time if need
          be
        </small>
      </div>
      {!valid && (
        <div className="card-body error">Please select a delivery time</div>
      )}
    </div>
  );
});

export default DeliveryPeriod;
