import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, browserHistory } from "react-router-dom";
import App from "./views/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter history={browserHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
