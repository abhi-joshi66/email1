import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm, // This key is required by redux-form to manage form state in the Redux store
  surveys: surveysReducer,
});
