import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import "./translations/i18n";
import App from "./App";
import { initAnalytics } from "./utils/analytics";

initAnalytics();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
