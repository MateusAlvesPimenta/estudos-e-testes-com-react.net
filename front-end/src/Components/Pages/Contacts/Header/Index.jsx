import React, { useContext } from "react";
import { CreateContactButton } from "../../../ActionButtons";
import { Context } from "../../../Context/Index";

export function Header() {

  const { getByName } = useContext(Context);

  function handleChange(e) {

    const { value } = e.target;
    getByName(value);
  }
  return (
    <header className="my-5">
      <h1>Contacts list</h1>
      <br />
      <CreateContactButton />

      <div className="col my-3">
        <input className="form-control"
          placeholder="Filter by name"
          onChange={handleChange}
          name="name"
          type="text"
        />
      </div>
    </header>
  )
}


