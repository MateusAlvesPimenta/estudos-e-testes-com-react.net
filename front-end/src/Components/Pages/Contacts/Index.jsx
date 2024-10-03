import React from "react";

import { ListContacts } from "./ListContacts";
import { Header } from "./Header/Index";
import { Container } from "reactstrap";


export function Contacts() {

    return (
        <div className="fill bg-light">
            <Container>
                <Header />
                <ListContacts />
            </Container>
        </div>
    )
}