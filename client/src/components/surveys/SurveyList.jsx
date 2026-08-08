import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch surveys when the component mounts and show a loading state while waiting.
    dispatch(fetchSurveys())
      .catch((err) => {
        console.error("Failed to load surveys:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const renderSurveys = () => {
    if (isLoading) {
      return (
        <div className="center-align">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
          <p>Loading surveys...</p>
        </div>
      );
    }

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
