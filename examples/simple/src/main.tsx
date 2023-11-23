import React from "react";
import ReactDOM from "react-dom/client";
import { ModalsProvider } from "@tembell/paresseux";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </React.StrictMode>,
);
