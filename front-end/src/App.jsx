import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import { ContextProvider } from "./Components/Context/Index";
import { MainRoutes } from "./Routes";

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
