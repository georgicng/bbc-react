import { useRef, forwardRef, useImperativeHandle } from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";

const User = forwardRef(function User({ user, cityList, onChange }, ref) {
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
    required: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "landmark",
      "city",
    ],
    properties: {
      firstName: { type: "string", title: "First name" },
      lastName: { type: "string", title: "Last name" },
      email: { type: "string", title: "Email" },
      phone: { type: "string", title: "Phone" },
      address: { type: "string", title: "address" },
      landmark: { type: "string", title: "Nearest Landmark" },
      city: {
        type: "string",
        title: "City",
        enum: cityList,
      },
    },
    allOf: [
      {
        if: {
          properties: {
            city: {
              const: "Other",
            },
          },
        },
        then: {
          properties: {
            altCity: {
              type: "string",
              title: "Other City" 
            },
          },
          required: ["altCity"],
        },
      },
    ],
  };

  const uiSchema = {
    firstName: {
      "ui:autofocus": true,
    },
    email: {
      "ui:options": {
        inputType: "email",
      },
    },
    address: {
      "ui:widget": "textarea",
    },
    "ui:submitButtonOptions": {
      norender: true,
    },
  };

  return (
    <Form
      ref={formRef}
      formData={user}
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onChange={({ formData }) => onChange("user", formData)}
      onError={(e) => console.log(e)}
    />
  );
});

export default User;
