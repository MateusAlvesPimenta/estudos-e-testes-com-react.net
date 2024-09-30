import React from "react";

import { Header } from "./Header/Index";
import { ListGroups } from "./ListGroups";


export function Groups() {

    return (
        <div className="container">
            <Header />
            <ListGroups />
        </div>
    )
}