import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";

function User({ user, cityList, onChange}) {
  const schema = {
    type: "object",
    required: ["firstName", "lastName", "email", "phone", "address", "landmark", "city"],
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
        oneOf: cityList,
      },
    },
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
      formData={user}
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onChange={onChange}
      onError={(e) => console.log(e)}
    />
  );
}

export default User;
