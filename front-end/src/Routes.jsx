import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./Components/Pages/Home/Index";
import { Contacts } from "./Components/Pages/Contacts/Index";
import { Groups } from "./Components/Pages/Groups/Index";
import { GroupDetails } from "./Components/Pages/GroupDetails/Index";

export function MainRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/group/:name/:id" element={<GroupDetails /> } />
        </Routes>
    )
}