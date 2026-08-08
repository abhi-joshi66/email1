import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        Welcome to the Dashboard! Here you can manage your surveys and view
        analytics.
      </p>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
