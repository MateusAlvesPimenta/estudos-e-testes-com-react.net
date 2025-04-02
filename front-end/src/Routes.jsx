import React from "react";
import { Route, Routes } from "react-router-dom";

import { Login } from "./Components/Pages/Login/Index";
import { Contacts } from "./Components/Pages/Contacts/Index";
import { Groups } from "./Components/Pages/Groups/Index";
import { GroupDetails } from "./Components/Pages/GroupDetails/Index";
import { Register } from "./Components/Pages/Register/Index";

export function MainRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/group/:name/:id" element={<GroupDetails /> } />
        </Routes>
    )
}