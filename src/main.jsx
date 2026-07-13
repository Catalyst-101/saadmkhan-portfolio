import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import "./index.css";
import App from "./App.jsx";

function Root() {
  useEffect(() => {
    let title =
      "Saad Muhammad Khan | Portfolio | Full Stack Developer & App Developer • ";

    const interval = setInterval(() => {
      title = title.substring(1) + title[0];
      document.title = title;
    }, 220);

    return () => clearInterval(interval);
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);