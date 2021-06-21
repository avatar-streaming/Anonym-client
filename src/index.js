import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App/App";
import store from "./components/App/store";
import "./styles/index";
import { createNextState } from "@reduxjs/toolkit";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
