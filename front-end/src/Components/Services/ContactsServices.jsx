import { api } from "./Api";

export async function getContacts(config) {

    return await api.get("/Contact", config)
        .catch(error => console.log(error));
}

export async function getContactsByName(name, config) {

    return await api.get(`/Contact/GetContactsByName/${name}`, config)
        .catch(error => {
            if (error.status === 404) {
                // if no contact with this name is found, return all contacts
                return getContacts();
            }
            console.log(error);
        });
}

export async function postContact(entity, config) {

    await api.post("/Contact/NewContact", entity, config)
        .catch(error => console.log(error));
}

export async function putContact(entity, config) {

    await api.put(`/Contact/UpdateContact/${entity.id}`, entity, config)
        .catch(error => console.log(error));
}

export async function deleteContact(id, config) {

    await api.delete(`/Contact/DeleteContact/${id}`, config)
        .catch(error => console.log(error));
}