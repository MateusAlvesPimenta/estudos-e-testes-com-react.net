import { ButtonGroup, Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Index";

export function CustomNavbar(props) {

    const { token } = useContext(Context);

    return (
        <Navbar
            container="fluid"
            className="bg-gradient"
            color="info"
            dark >
            <NavbarBrand>
                <h1>Estudos e testes</h1>
            </NavbarBrand>
            <ButtonGroup>
                <Link onClick={() => event.preventDefault()}
                    to="/"
                    className="btn btn-outline-light btn-lg border-2 fw-bold fs-4">
                    Login
                </Link>
                {token &&
                    <>
                        <Link onClick={() => event.preventDefault()}
                            to="/groups"
                            className="btn btn-outline-light btn-lg border-2 fw-bold fs-4" >
                            Groups
                        </Link>
                        <Link onClick={() => event.preventDefault()}
                            to="/contacts"
                            className="btn btn-outline-light btn-lg border-2 fw-bold fs-4" >
                            Contacts
                        </Link>
                    </>
                }
            </ButtonGroup>
        </Navbar>
    )
}