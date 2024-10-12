import { api } from "./Api";

export async function getGroups() {

    return await api.get("/Group")
        .catch(error => console.log(error));
}

export async function getGroupsByName(name) {

    return await api.get(`/Group/GetGroupsByName/${name}`)
        .catch(error => {
            if (error.status == 404) {
                // if no group with this name is found, return
                return getGroups();
            }
            console.log(error);
        });
}

export async function getGroupById(id) {

    return await api.get(`/Group/GetGroupById/${id}`)
        .catch(error => console.log(error));
}

export async function postGroup(entity) {

    await api.post("/Group/NewGroup", entity)
        .catch(error => console.log(error));
}

export async function putGroup(entity) {

    await api.put(`/Group/UpdateGroup/${entity.id}`, entity)
        .catch(error => console.log(error));
}

export async function deleteGroup(id) {

    await api.delete(`/Group/DeleteGroup/${id}`)
        .catch(error => console.log(error));
}

export async function addContact(contactId, groupId) {
    
    await api.put(`/Group/AddContact/${contactId}?groupId=${groupId}`)
        .catch(error => console.log(error));
}

export async function removeContact(contactId, groupId) {
    await api.put(`/Group/RemoveContact/${contactId}?groupId=${groupId}`)
        .catch(error => console.log(error));
}