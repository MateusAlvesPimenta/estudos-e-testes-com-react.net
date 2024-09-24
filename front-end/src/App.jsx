import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Components/Header/Index";
import { ListContacts } from "./Components/ContactsList/Inderx";
import { ContextProvider } from "./Components/Context/Index";
import { FilterByName } from "./Components/Filter/Indesx";

function App() {

  return (
    <ContextProvider>
      <div className="container">
        <Header />
        <FilterByName />
        <ListContacts />
      </div>
    </ContextProvider>
  );
}

export default App;
