import React, { createContext, useMemo, useState } from "react";
import {
    deleteRequest, getByNameRequest,
    getRequest, postRequest, putRequest
} from "../Services/Index";

export const Context = createContext({});

export function ContextProvider(props) {

    const [updateData, setUpdateData] = useState(true);
    const [contact, setContact] = useState([]);

    async function get() {
        const response = await getRequest();

        setContact(response.data);
    }

    async function getByName(name) {
        const response = await getByNameRequest(name);

        setContact(response.data);
    }

    async function post(entity) {
        await postRequest(entity);
        setUpdateData(true);
    }

    async function put(entity) {
        await putRequest(entity);
        setUpdateData(true);
    }

    async function deleteContact(id) {
        await deleteRequest(id);
        setUpdateData(true);
    }

    useMemo(() => {
        get();
        setUpdateData(false);
    }, [updateData]);

    return (
        <Context.Provider value={{
            contact,
            getByName,
            post,
            put,
            deleteContact
        }}>
            {props.children}
        </Context.Provider>
    )
}