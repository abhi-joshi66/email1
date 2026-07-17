// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { Provider } from "react-redux";
// import { store } from "./store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );

// 1) Import ReactDOM library
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// 2) Import App component as usual
import App from "./components/App";

const store = createStore(() => [], {}, applyMiddleware());

// 3) Get a reference to the div with ID root
const el = document.getElementById("root");

// 4) Tell React to take control of that element
const root = ReactDOM.createRoot(el);

// 5) Show the component on the screen
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
