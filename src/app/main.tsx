// //import { StrictMode } from 'react'
// import { createRoot } from "react-dom/client";
// import "./src/app/style/index.css";
// import App from "./src/app/App.tsx";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")!).render(
//   //<StrictMode>

//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   //</StrictMode>,
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./style/index.css";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
