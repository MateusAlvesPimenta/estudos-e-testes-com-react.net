import React, { useContext, useMemo } from "react";

import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

import { Context } from "../../Context/Index";

export function GroupDetails() {

    const { id } = useParams();
    const { groupDetails, getById } = useContext(Context);

    useMemo(() => {
        getById(id)

        console.log(groupDetails);
    }, [])



    return (
        <Container className="mt-3">

            <h1>grupo {groupDetails.name}</h1>
            <p>{ groupDetails.description}</p>
            <p>{groupDetails.contacts.length} members</p>
        </Container>
    )
}