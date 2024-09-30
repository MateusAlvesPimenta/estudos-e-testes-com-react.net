import React from "react";
import { Route, Routes } from "react-router-dom";

import { Contacts } from "./Components/Pages/Contacts/Index";
import { Groups } from "./Components/Pages/Groups/Index";

export function MainRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/groups" element={<Groups />} />
        </Routes>
    )
}