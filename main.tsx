//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./src/app/style/index.css";
import App from "./src/app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  //<StrictMode>

  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</StrictMode>,
);
