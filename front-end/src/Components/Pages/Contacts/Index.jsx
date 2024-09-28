import React from "react";

import { ListContacts } from "./ListContacts";
import { Header } from "./Header/Index";


export function Contacts() {

    return (
        <div className="container">
            <Header />
            <ListContacts />
        </div>
    )
}