import React from "react";

import { CreateGroupButton } from "../../../ActionButtons";
import { Filter } from "../../Filter";

export function Header() {

  return (
    <header className="py-5">
      <h1>Groups list</h1>
      <br />
      <CreateGroupButton />

      <Filter entityType="group" />
    </header>
  )
}


