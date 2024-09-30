import { api } from "./Api";

export async function getContacts() {

    return await api.get("/Contact")
        .catch(error => console.log(error));
}

export async function getContactsByName(name) {

    return await api.get(`/Contact/GetContactsByName/${name}`)
        .catch(error => {
            if (error.status === 404) {
                // if no contact with this name is found, return all contacts
                return getContacts();
            }
            console.log(error);
        });
}

export async function postContact(entity) {

    await api.post("/Contact/NewContact", entity)
        .catch(error => console.log(error));
}

export async function putContact(entity) {

    await api.put(`/Contact/UpdateContact/${entity.id}`, entity)
        .catch(error => console.log(error));
}

export async function deleteContact(id) {

    await api.delete(`/Contact/DeleteContact/${id}`)
        .catch(error => console.log(error));
}