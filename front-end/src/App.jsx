import React from "react";

import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { ContextProvider } from "./Components/Context/Index";
import { CustomNavbar } from "./Components/Pages/Navbar/Index";
import { MainRoutes } from "./Routes";

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <CustomNavbar />
        <MainRoutes />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
