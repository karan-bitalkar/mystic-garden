import './global.css'; // in main.jsx or main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // ye tumhara existing App.tsx hai
import "./global.css"; // global CSS

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
