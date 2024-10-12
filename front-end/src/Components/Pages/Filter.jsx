import React, { useContext } from "react";

import { Context } from "../Context/Index";

export function Filter(props) {

    const { entityType } = props
    const { getByName } = useContext(Context);

    function handleChange(e) {

        const { value } = e.target;
        getByName(value, entityType);
    }

    return (
        <input className="form-control my-3"
            placeholder="Filter by name"
            onChange={handleChange}
            name="name"
            type="text"
        />
    )
}