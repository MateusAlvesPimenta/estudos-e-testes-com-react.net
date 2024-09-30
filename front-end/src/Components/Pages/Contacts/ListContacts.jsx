import React, { useContext } from "react";
import { DeleteButton, EditContactButton } from "../../ActionButtons";
import { Context } from "../../Context/Index";

export function ListContacts() {

    const { contact } = useContext(Context);

    if (contact.length == 0) {
        // if no contacts are found, this return a default message
        return (
            <h1>Não há contatos aqui</h1>
        )
    }

    return (
        <table className="table table-bordered">
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
                {contact.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phoneNumber}</td>
                        <td><input type="checkbox" disabled checked={contact.active} /></td>
                        <td>
                            <EditContactButton entity={contact} />
                            <DeleteButton entity={contact} entityType="contact" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}