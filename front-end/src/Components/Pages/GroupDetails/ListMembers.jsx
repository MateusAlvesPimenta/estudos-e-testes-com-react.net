import React, { useContext, useMemo } from "react";

import { Table } from "reactstrap";
import { useParams } from "react-router-dom";

import { Context } from "../../Context/Index";
import { RemoveFromGroup } from "../../ActionButtons";

export function ListMembers() {

    const { id } = useParams();
    const { groupDetails, getById } = useContext(Context);

    useMemo(() => {
        getById(id);
    }, []);

    return (
        <Table hover bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>PhoneNumber</th>
                    <th>Active</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {groupDetails.contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phoneNumber}</td>
                        <td><input type="checkbox" name="active" checked={contact.active} disabled /></td>
                        <td>
                            <RemoveFromGroup contact={contact} groupId={id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}