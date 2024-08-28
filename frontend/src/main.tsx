import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
