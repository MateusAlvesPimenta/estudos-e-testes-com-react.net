import React from "react";

import { Header } from "./Header/Index";
import { ListGroups } from "./ListGroups";
import { Container } from "reactstrap";


export function Groups() {

    return (
        <Container>
            <Header />
            <ListGroups />
        </Container>
    )
}