import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App/App";
import store from "./components/App/store";
import "./styles/index";
import { Suspense } from "react";
import Loading from "./components/Loading/Loading";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={Loading}>
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);
