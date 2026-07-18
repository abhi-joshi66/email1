import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { fetchUser } from "../actions";
import { useDispatch } from "react-redux";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the current user when the component mounts
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
