// React helper that enables extra checks/warnings in development
import { StrictMode } from "react";

// Function to create a React root for rendering into the DOM
import { createRoot } from "react-dom/client";

// design tokens / CSS variables (colors, spacing, etc.)
import "./styles/tokens.css";

// global app-wide styles
import "./index.css";

// the root App component
import App from "./App.tsx";

// find the #root div and start React rendering into it
// "!" tells TypeScript "trust me, this element exists"
createRoot(document.getElementById("root")!).render(
  // wraps the app to catch potential bugs/deprecated code (dev-only, no effect in production)
  <StrictMode>
    <App />
  </StrictMode>,
);
