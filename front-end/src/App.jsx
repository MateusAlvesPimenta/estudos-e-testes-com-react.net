import React from "react";

import { BrowserRouter } from "react-router-dom";

import { ContextProvider } from "./Components/Context/Index";
import { CustomNavbar } from "./Components/Pages/CustomNavbar";
import { MainRoutes } from "./Routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";

function App() {

  return (
    <BrowserRouter>
      <ContextProvider>
        <CustomNavbar />
        <MainRoutes />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
