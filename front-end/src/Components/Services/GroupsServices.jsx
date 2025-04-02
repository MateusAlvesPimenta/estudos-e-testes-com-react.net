import { api } from "./Api";

export async function getGroups(config) {

    return await api.get("/Group", config)
        .catch(error => console.log(error));
}

export async function getGroupsByName(name, config) {

    return await api.get(`/Group/GetGroupsByName/${name}`, config)
        .catch(error => {
            if (error.status == 404) {
                // if no group with this name is found, return
                return getGroups();
            }
            console.log(error);
        });
}

export async function getGroupById(id, config) {

    return await api.get(`/Group/GetGroupById/${id}`, config)
        .catch(error => console.log(error));
}

export async function postGroup(entity, config) {

    await api.post("/Group/NewGroup", entity, config)
        .catch(error => console.log(error));
}

export async function putGroup(entity, config) {

    await api.put(`/Group/UpdateGroup/${entity.id}`, entity, config)
        .catch(error => console.log(error));
}

export async function deleteGroup(id, config) {

    await api.delete(`/Group/DeleteGroup/${id}`, config)
        .catch(error => console.log(error));
}

export async function addContact(contactId, groupId, config) {
    
    await api.put(`/Group/AddContact/${contactId}?groupId=${groupId}`, groupId, config)
        .catch(error => console.log(error));
}

export async function removeContact(contactId, groupId, config) {
    await api.put(`/Group/RemoveContact/${contactId}?groupId=${groupId}`, groupId, config)
        .catch(error => console.log(error));
}