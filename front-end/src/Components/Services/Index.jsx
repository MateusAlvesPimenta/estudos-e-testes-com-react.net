import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5235/Contact",
    timeout: 2000
})


export async function getRequest() {
    
    return await instance.get()
    .catch(error => console.log(error));
}

export async function getByNameRequest(name) {
    return await instance.get(`/GetContactsByName/${name}`)
        .catch(error => {
            if (error.status === 404){
                return getRequest();
            }
            console.log(error);
        });
}

export async function postRequest(entity) {
    
    delete entity.id;

    await instance.post("/NewContact", entity)
        .catch(error => console.log(error));
}

export async function putRequest(entity) {

    await instance.put(`/UpdateContact/${entity.id}`, entity)
        .catch(error => console.log(error));
}

export async function deleteRequest(id) {
    
    await instance.delete(`/DeleteContact/${id}`)
        .catch(error => console.log(error));
}