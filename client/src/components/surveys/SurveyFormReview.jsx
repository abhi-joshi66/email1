import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { reduxForm, Field } from "redux-form";
import { submitSurvey } from "../../actions";
import { useHistory } from "react-router-dom";

const SurveyFormReview = ({ onCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const history = useSelector(
  //     (state) => state.router?.location?.pathname || "/",
  //   );
  const formValues = useSelector(
    (state) => state.form.surveyForm?.values || {},
  );

  console.log("SurveyFormReview formValues:", formValues);

  const reviewFields = () => {
    return Object.keys(formValues).map((key) => {
      return (
        <div key={key}>
          <label>{key}</label>
          <div>{formValues[key]}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields()}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => dispatch(submitSurvey(formValues, history))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
