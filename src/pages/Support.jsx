import { useEffect, useState } from "react";
import { usePostIssueMutation } from "../services/touchpoint";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import Heading from "../components/Heading";

const TITLE = "Lodge a Complaint";
const SUBTITLE =
  "Do you have any complaint about your order? Please do let us know, so we can help.";

const Support = ({ title = TITLE, subtitle = SUBTITLE }) => {
  const [postIssue, { isLoading, isError, isSuccess }] = usePostIssueMutation();
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(() =>
      isError
        ? `Could't process your request, please try again`
        : isSuccess
        ? "Your message has been sent"
        : ""
    );
  }, [isError, isSuccess]);

  //TODO: useMemo for disabled state
  const schema = {
    title: "Contact",
    type: "object",
    required: ["name", "subject", "email", "message"],
    properties: {
      name: { type: "string", title: "Name", default: "" },
      subject: { type: "string", title: "Subject", default: "" },
      email: { type: "string", title: "Email", default: "" },
      description: { type: "string", title: "Message", default: "" },
    },
  };

  const uiSchema = {
    name: {
      "ui:autofocus": true,
    },
    subject: {
      "ui:autocomplete": "given-name",
    },
    email: {
      "ui:options": {
        inputType: "email",
      },
    },
    description: {
      "ui:widget": "textarea",
    },
    "ui:submitButtonOptions": {
      props: {
        disabled: isLoading,
        className: "btn btn-orange",
      },
      norender: false,
      submitText: "Send",
    },
  };

  const log = (type, data) => console.error(type, data);
  const onSubmit = ({ formData }) => {
    postIssue(formData);
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="contact-page">
        <div className="container-fluid text-center">
          <Heading title={title} subtitle={subtitle} />

          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <Form
                  schema={schema}
                  uiSchema={uiSchema}
                  validator={validator}
                  onSubmit={onSubmit}
                  onError={log}
                />
                <vue-base64-file-upload
                  class="v1 form-group"
                  accept="image/png,image/jpeg"
                  image-class="v1-image"
                  input-class="v1-input form-control"
                  max-size="customImageMaxSize"
                  disable-preview="true"
                  size-exceeded="onSizeExceeded"
                  file="onFile"
                  load="onLoad"
                />
                {isLoading && (
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {status && <div className="status form-group">{status}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
