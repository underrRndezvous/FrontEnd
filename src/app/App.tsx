import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import routes from "./routes";
import { AnimatePresence } from "framer-motion";
import React from "react";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  if (!element) return null;
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default App;
