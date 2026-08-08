import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);

  useEffect(() => {
    // Fetch surveys when the component mounts
    dispatch(fetchSurveys());
  }, [dispatch]);
  const renderSurveys = () => {
    if (!surveys || surveys.length === 0) {
      return <p>No surveys available.</p>;
    }

    return surveys.reverse().map((survey) => (
      <div className="card darken-1" key={survey._id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ));
  };

  return <div>{renderSurveys()}</div>;
};

export default SurveyList;
