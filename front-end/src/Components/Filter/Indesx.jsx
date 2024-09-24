import React, { useContext } from "react";
import { Context } from "../Context/Index";

export function FilterByName() {

    const {getByName} = useContext(Context)

    function handleChange(e) {
        
        const { value } = e.target;
        
        getByName(value)
    }
    return (
        <div className="col my-3">
            <input className="form-control"
                placeholder="Filter by name"
                onChange={handleChange}
                name="name"
                type="text"
            />
        </div>
    )
}