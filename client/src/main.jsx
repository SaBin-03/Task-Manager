import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Contextprovider } from "./context/callcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Contextprovider>
      <App />
      <Toaster />
    </Contextprovider>
  </StrictMode>,
);
