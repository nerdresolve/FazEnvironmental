import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root") as HTMLElement;
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App router={(children) => <BrowserRouter>{children}</BrowserRouter>} />
    </HelmetProvider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
