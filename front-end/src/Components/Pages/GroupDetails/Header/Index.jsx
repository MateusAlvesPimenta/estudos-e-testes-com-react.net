import React, { useContext } from "react";

import { AddToGroup } from "../../../ActionButtons";
import { Context } from "../../../Context/Index";

import "./Styles.css";

export function Header() {

  const { groupDetails } = useContext(Context);

  return (
    <header className="py-5">

      <h1>Grupo: {groupDetails.name}</h1>
      <h4 className="description">{groupDetails.description}</h4>

      <AddToGroup />
      <p>{groupDetails.contacts.length} members</p>
    </header>
  )
}


