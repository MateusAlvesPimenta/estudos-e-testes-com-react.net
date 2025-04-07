import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, Input, Label } from "reactstrap";
import { Context } from "../../Context/Index";

export function Register() {

    const { post } = useContext(Context);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    async function submit() {
        event.preventDefault();
        if (user.password != user.confirmPassword) {
            return alert("Unmatching password");
        }
        let status = await post(user, "register");
        if (status === 200) {
            return navigate("/");
        }
        alert("Invalid register");
    }
    return (
        <Container className="bg-light d-flex flex-column">
            <Form onInvalid={e => console.log(e)} onSubmit={submit} className="authentication">
                <h1>Register</h1>
                <Label for="email">Email*</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required />
                
                <Label for="password">Password*</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                    title="Deve conter pelo menos uma letra maiúscula, uma minúscula, \ um número e um caractere especial."
                    onChange={handleChange}
                    required />
                
                <Label for="confirmPassword">Confirm password*</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                    title="Deve ser igual ao campo se senha"
                    valid={user.password && user.password === user.confirmPassword}
                    onChange={handleChange}
                    required />
                <Button type="submit" color="primary" className="my-2 mx-auto">Register</Button>
                <p>Já possui conta? <Link to="/">Login</Link></p>
            </Form>
        </Container>
    )
}