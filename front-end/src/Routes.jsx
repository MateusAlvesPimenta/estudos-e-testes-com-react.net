import React from "react";
import { Route, Routes } from "react-router-dom";

import { Contacts } from "./Components/Pages/Contacts/Index";

export function MainRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Contacts />} />
        </Routes>
    )
}