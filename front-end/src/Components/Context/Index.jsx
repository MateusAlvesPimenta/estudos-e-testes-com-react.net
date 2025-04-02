import React, { createContext, useMemo, useState } from "react";

import {
    deleteContact, getContactsByName,
    getContacts, postContact, putContact
} from "../Services/ContactsServices";

import {
    getGroups, getGroupsByName,
    postGroup, putGroup, deleteGroup,
    getGroupById,
    removeContact,
    addContact
} from "../Services/GroupsServices";
import { AuthenticateUser, RegisterUser } from "../Services/AccountServices";

export const Context = createContext({});

export function ContextProvider(props) {

    const [updateData, setUpdateData] = useState(false);
    const [updateGroupDetails, setUpdateGroupDetails] = useState(false);
    const [contact, setContact] = useState([]);
    const [group, setGroup] = useState([]);
    const [groupDetails, setGroupDetails] = useState({
        name: "",
        description: "",
        contacts: []
    });
    const [token, setToken] = useState(sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "");

    async function get(entityType) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        if (entityType === "group") {
            const response = await getGroups(authorization);
            setGroup(response.data);
        }
        else if (entityType === "contact") {
            const response = await getContacts(authorization);
            setContact(response.data);
        }
    }

    async function getById(id) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        var response = await getGroupById(id, authorization);

        setGroupDetails(response.data);
    }

    async function getByName(name, entityType) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        if (entityType === "group") {
            const response = await getGroupsByName(name, authorization);
            setGroup(response.data);
        }
        else if (entityType === "contact") {
            const response = await getContactsByName(name, authorization);
            setContact(response.data);
        }
    }

    async function post(entity, entityType) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        if (entityType === "group") {
            await postGroup(entity, authorization);
        }
        else if (entityType === "contact") {
            await postContact(entity, authorization);
        }
        else if (entityType === "login") {
            let response = await AuthenticateUser(entity);
            setToken(response.data.token);
            sessionStorage.setItem("token", response.data.token);
        }
        else {
            let status = await RegisterUser(entity);
            return status;
        }
        setUpdateData(true);
    }

    async function put(entity, entityType) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        if (entityType === "group") {
            await putGroup(entity, authorization);
        }
        else if (entityType === "contact") {
            await putContact(entity, authorization);
        }
        setUpdateData(true);
    }

    async function deleteEntity(id, entityType) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        if (entityType === "group") {
            await deleteGroup(id, authorization);
        }
        else if (entityType === "contact") {
            await deleteContact(id, authorization);
        }
        setUpdateData(true);
    }

    async function addContactToGroup(contactId, groupId) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        await addContact(contactId, groupId, authorization);
        setUpdateGroupDetails(true);
    }

    async function removeContactFromGroup(contactId, groupId) {
        const authorization = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        await removeContact(contactId, groupId, authorization);
        setUpdateGroupDetails(true);
    }



    useMemo(() => {
        if (sessionStorage.getItem("token")) {
            if (groupDetails.id != undefined) {
                getById(groupDetails.id);
            }
            setUpdateGroupDetails(false);
            setUpdateData(true);
        }
    }, [updateGroupDetails]);

    useMemo(() => {
        if (sessionStorage.getItem("token")) {
            get("contact");
            get("group");
            setUpdateData(false);
            console.log(true);
        }
        console.log(false);
    }, [updateData]);

    return (
        <Context.Provider value={{
            contact,
            group,
            groupDetails,
            token,
            getById,
            getByName,
            post,
            put,
            deleteEntity,
            addContactToGroup,
            removeContactFromGroup
        }}>
            {props.children}
        </Context.Provider>
    )
}