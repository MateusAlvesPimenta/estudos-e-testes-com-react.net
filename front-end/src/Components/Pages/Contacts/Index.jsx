import React from "react";

import { ListContacts } from "./ListContacts";
import { Header } from "./Header/Index";
import { Container } from "reactstrap";


export function Contacts() {

    return (
        <Container>
            <Header />
            <ListContacts />
        </Container>
    )
}