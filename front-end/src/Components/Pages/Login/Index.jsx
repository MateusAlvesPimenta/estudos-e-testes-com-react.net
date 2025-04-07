import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Container, Form, Input, Label } from "reactstrap";
import { Context } from "../../Context/Index";

export function Login() {

    const { post } = useContext(Context);
    const [user, setUser] = useState({});
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    async function submit() {
        event.preventDefault();
        let status = await post(user, "login");
        if (status === 200) {
            return navigate("/contacts");
        }
        setInvalid(true);
    }

    return (
        <Container className="bg-light d-flex flex-column">
            <Form onSubmit={submit} className="authentication">
                <h1>Login</h1>
                <Label for="email">Email*</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={user && user.email}
                    required />
                
                <Label for="password">Password*</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    invalid={invalid}
                    onChange={handleChange}
                    value={user && user.password}
                    required />
                <Button type="submit" color="primary" className="my-2 mx-auto">Login</Button>
                <p>Não possui conta? <Link to="/register">Registre-se</Link></p>
            </Form>
        </Container>
    )
}