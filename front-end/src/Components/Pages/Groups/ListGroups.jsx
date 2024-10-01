import React, { useContext } from "react";
import { DeleteButton, EditGroupButton } from "../../ActionButtons";
import { Context } from "../../Context/Index";

export function ListGroups() {

    const { group } = useContext(Context);

    if (group.length == 0) {
        // if no groups are found, this return a default message
        return (
            <h1>Não há grupos aqui</h1>
        )
    }

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {group.map(group => (
                    <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td>
                            <EditGroupButton entity={group} />
                            <DeleteButton entity={group} entityType="group" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}