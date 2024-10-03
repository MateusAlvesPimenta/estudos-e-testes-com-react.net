import React from "react";

import { Header } from "./Header/Index";
import { ListGroups } from "./ListGroups";
import { Container } from "reactstrap";


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