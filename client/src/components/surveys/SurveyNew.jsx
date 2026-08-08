// SurveyNew shows SurveyForm and SurveyFormReview
import React, { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  //   const onSubmit = (values) => {
  //     setShowFormReview(true);
  //   };

  const renderContent = () => {
    if (showFormReview) {
      return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

// This code is used to clear the form data when the component is unmounted, so that when the user navigates back to the form, they don't see their previous input. This is important for a good user experience, especially if the user decides to start over or create a new survey.
export default reduxForm({
  form: "surveyForm", // a unique identifier for this form
})(SurveyNew);
