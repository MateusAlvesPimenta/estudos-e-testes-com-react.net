import React from "react";

import { Container } from "reactstrap";

import { Header } from "./Header/Index";
import { ListMembers } from "./ListMembers";


export function GroupDetails() {


    return (
        <div className="fill bg-light">
            <Container>
                <Header />
                <ListMembers />
            </Container>
        </div>
    )

}