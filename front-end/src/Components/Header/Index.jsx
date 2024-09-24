import React from "react";
import { AddButton } from "../ActionButtons";

export function Header() {

  return (
    <header className="my-5">
      <h1>Contacts list</h1>
      <br />
      <AddButton entityType="contact" />
    </header>
  )
}


