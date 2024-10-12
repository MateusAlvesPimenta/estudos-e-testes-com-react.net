import React from "react";

import { Container } from "reactstrap";

import { Header } from "./Header/Index";
import { ListGroups } from "./ListGroups";


export function Groups() {

    return (
        <div className="fill bg-light">
            <Container>
                <Header />
                <ListGroups />
            </Container>
        </div>
    )
}