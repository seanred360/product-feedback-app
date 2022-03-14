import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./dist/css/style.css"; // must come after bootstrap to override the styles
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
