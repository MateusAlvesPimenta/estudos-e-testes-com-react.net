import { api } from "./Api";

export async function AuthenticateUser(data) {

    return await api.post("/Account/AuthenticateUser", data)
        .catch(e => {
            console.log(e);
            return e;
        });
}

export async function RegisterUser(data) {
    return await api.post("Account/RegisterUser", data)
        .then(response => response.status)
        .catch(e => {
            console.log(e);
            return e.status;
        });
}