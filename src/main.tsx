import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// PWA: registra el Service Worker solo en producción (modo offline)
if ("serviceWorker" in navigator && window.location.protocol.startsWith("http") && !window.location.hostname.includes("localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* sin SW el sitio funciona igual */
    });
  });
}
