// SurveyForm shows a form for a user to add input
import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import FIELDS from "./formFields";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import validateEmails from "../../utils/validateEmails";

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  const emailError = validateEmails(values.recipients || "");
  if (emailError) {
    errors.recipients = emailError;
  }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
};

export default reduxForm({
  form: "surveyForm", // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
