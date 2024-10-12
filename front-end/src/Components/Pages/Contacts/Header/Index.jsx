import React from "react";

import { CreateContactButton } from "../../../ActionButtons";
import { Filter } from "../../Filter";

export function Header() {

  return (
    <header className="py-5">
      <h1>Contacts list</h1>
      <br />
      <CreateContactButton />
      <Filter entityType="contact" />
    </header>
  )
}