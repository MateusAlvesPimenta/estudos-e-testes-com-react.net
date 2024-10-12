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

export const Context = createContext({});

export function ContextProvider(props) {

    const [updateData, setUpdateData] = useState(true);
    const [updateGroupDetails, setUpdateGroupDetails] = useState(true);
    const [contact, setContact] = useState([]);
    const [group, setGroup] = useState([]);
    const [groupDetails, setGroupDetails] = useState({
        name: "",
        description: "",
        contacts: []
    });

    async function get(entityType) {
        
        if (entityType === "group") {
            const response = await getGroups();
            setGroup(response.data);
        }
        else {
            const response = await getContacts();
            setContact(response.data);
        }
    }
    
    async function getById(id) {
        var response = await getGroupById(id);

        setGroupDetails(response.data);
    }

    async function getByName(name, entityType) {
        
        if (entityType === "group") {
            const response = await getGroupsByName(name);
            setGroup(response.data);
        }
        else {
            const response = await getContactsByName(name);
            setContact(response.data);
        }
    }

    async function post(entity, entityType) {
        
        if (entityType === "group") {
            await postGroup(entity);
        }
        else {
            await postContact(entity);
        }
        setUpdateData(true);
    }

    async function put(entity, entityType) {
        
        if (entityType === "group") {
            await putGroup(entity);
        }
        else {
            await putContact(entity);
        }
        setUpdateData(true);
    }

    async function deleteEntity(id, entityType) {
        
        if (entityType === "group") {
            await deleteGroup(id);
        }
        else {
            await deleteContact(id);
        }
        setUpdateData(true);
    }

    async function addContactToGroup(contactId, groupId) { 
        
        await addContact(contactId, groupId);
        setUpdateGroupDetails(true);
    }

    async function removeContactFromGroup(contactId, groupId) {
        
        await removeContact(contactId, groupId);
        setUpdateGroupDetails(true);
    }
    
    
    
    useMemo(() => {
        if (groupDetails.id != undefined) {
            getById(groupDetails.id);
        }
        setUpdateGroupDetails(false);
        setUpdateData(true);
    }, [updateGroupDetails]);

    useMemo(() => {
        get("contact");
        get("group");
        setUpdateData(false);
    }, [updateData]);

    return (
        <Context.Provider value={{
            contact,
            group,
            groupDetails,
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