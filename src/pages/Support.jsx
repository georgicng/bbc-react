import { useEffect, useState } from "react";
import { useId } from "react";
import {
  usePostIssueMutation,
  usePostFileMutation,
} from "../services/touchpoint";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import Heading from "../components/Heading";

const TITLE = "Lodge a Complaint";
const SUBTITLE =
  "Do you have any complaint about your order? Please do let us know, so we can help.";

const Support = ({ title = TITLE, subtitle = SUBTITLE }) => {
  const [postIssue, { isLoading, isError, isSuccess }] = usePostIssueMutation();
  const [uploadFile, { isLoading: uploading, isError: failed }] =
    usePostFileMutation();
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(() =>
      isError
        ? `Could't process your request, please try again`
        : isSuccess
        ? "Your message has been sent"
        : ""
    );
  }, [isError, isSuccess, failed]);

  //TODO: useMemo for disabled state
  const schema = {
    type: "object",
    required: ["name", "subject", "email", "description"],
    properties: {
      name: { type: "string", title: "Name", default: "" },
      subject: { type: "string", title: "Subject", default: "" },
      email: { type: "string", title: "Email", default: "" },
      description: { type: "string", title: "Description", default: "" },
      file: { type: "string", format: "data-url", title: "Upload image" },
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
    file: {
      "ui:options": {
        filePreview: true,
        accept: "image/png,image/jpeg",
      },
    },
    "ui:submitButtonOptions": {
      props: {
        disabled: isLoading,
        className: "btn btn-orange",
      },
      norender: false,
      submitText: "Submit",
    },
  };

  const log = (type, e = null) => console.log(type, e);
  const id = useId();
  const getFilePayload = (data) => {
    const title = `Issue ${id}`;
    let name = data.split(";")[1];
    if (name.startsWith("name=")) {
      name = name.slice(5);
    } else {
      name = `${title}_evidence.${data.split(";")[0].split("/")[1]}`;
    }
    return {
      title,
      name,
      data,
    };
  };
  const onSubmit = async ({ formData }) => {
    //TODO: check size limit (3MB)
    formData.file && (await uploadFile(getFilePayload(formData.file)));
    await postIssue(formData);
  };

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="contact-page">
        <div className="container-fluid text-center">
          <Heading title={title} subtitle={subtitle} />

          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8 text-left">
                <Form
                  schema={schema}
                  uiSchema={uiSchema}
                  validator={validator}
                  onSubmit={onSubmit}
                  onError={log}
                />
                {(isLoading || uploading) && (
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
