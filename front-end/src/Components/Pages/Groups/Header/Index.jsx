import React, { useContext } from "react";

import { Context } from "../../../Context/Index";
import { CreateGroupButton } from "../../../ActionButtons";
import { Col } from "reactstrap";

export function Header() {

  const { getByName } = useContext(Context);

  function handleChange(e) {

    const { value } = e.target;
    getByName(value, "group");
  }
  return (
    <header className="my-5">
      <h1>Groups list</h1>
      <br />
      <CreateGroupButton />

      <Col className="my-3">
          <input className="form-control"
            placeholder="Filter by name"
            onChange={handleChange}
            name="name"
            type="text"
          />
      </Col>
    </header>
  )
}


