import React, { useContext, useMemo, useState } from "react";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledDropdown } from "reactstrap";
import { Context } from "../Context/Index";
import { Link, useParams } from "react-router-dom";
import { addContact } from "../Services/GroupsServices";

export function CreateContactButton() {

    const { post } = useContext(Context);
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState({
        name: "",
        phoneNumber: "",
        active: ""
    });

    function openCloseModal() {
        setModal(!modal)
    }

    function handleChange(e) {
        const { name, value, checked } = e.target;
        setContact({
            ...contact,
            [name]: value, active: checked
        });
    }

    function submit() {
        post(contact);
        openCloseModal();
        event.preventDefault();
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-primary px-4">New contact</button>

            <Modal isOpen={modal}>
                <ModalHeader>New Contact</ModalHeader>
                <form onReset={openCloseModal} onSubmit={submit}>
                    <ModalBody>
                        <label className="form-label">Name</label>
                        <input type="text" name="name"
                            onChange={handleChange}
                            className="form-control mb-3" required />

                        <label className="form-label" >Phone Number</label>
                        <input type="tel" name="phoneNumber"
                            placeholder="0000-0000"
                            pattern="^[0-9]{4}-[0-9]{4}$"
                            onChange={handleChange}
                            className="form-control mb-3" required />

                        <div className="form-check">
                            <input id="active" type="checkbox" name="active"
                                onChange={handleChange}
                                className="form-check-input" />

                            <label htmlFor="active" className="form-check-label" >Active</label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-primary">Include</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function EditContactButton(props) {

    const { entity } = props;
    const { put } = useContext(Context);

    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState({
        ...entity
    });

    function openCloseModal() {
        setModal(!modal);
    }

    function handleChange(e) {

        const { name, value, checked } = e.target;

        setContact({
            ...contact, [name]: value, active: checked
        });
    }

    function submit() {
        put(contact);
        openCloseModal();
        event.preventDefault();
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-secondary me-4">Edit</button>

            <Modal isOpen={modal}>
                <ModalHeader>Edit Contact</ModalHeader>
                <form onReset={openCloseModal} onSubmit={submit}>
                    <ModalBody>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input type="text" name="name"
                                onChange={handleChange}
                                className="form-control mb-3"
                                value={contact && contact.name} required />

                            <label className="form-label" >Phone Number</label>
                            <input type="tel" name="phoneNumber"
                                placeholder="0000-0000"
                                pattern="^[0-9]{4}-[0-9]{4}$"
                                onChange={handleChange}
                                className="form-control mb-3"
                                value={contact && contact.phoneNumber} required />

                            <div className="form-check">
                                <input id="active" type="checkbox" name="active"
                                    onChange={handleChange}
                                    className="form-check-input"
                                    checked={contact && contact.active} />

                                <label htmlFor="active" className="form-check-label" >Active</label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-secondary">Edit</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function CreateGroupButton() {

    const { post } = useContext(Context);

    const [modal, setModal] = useState(false);
    const [charactersCount, setCharactersCount] = useState(0);
    const [group, setGroup] = useState({
        name: "",
        description: ""
    });

    function openCloseModal() {
        setModal(!modal);
    }

    function submit() {

        post(group, "group");
        openCloseModal();
        event.preventDefault();
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setGroup({ ...group, [name]: value });

        if (name === "description") {
            setCharactersCount(value.length);
        }
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-primary px-3">New group</button>

            <Modal isOpen={modal}>
                <ModalHeader>Create group</ModalHeader>
                <form onReset={openCloseModal} onSubmit={submit}>
                    <ModalBody>
                        <label className="form-label">Name</label>
                        <input name="name" type="text" className="form-control"
                            onChange={handleChange} required />

                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control"
                            onChange={handleChange} required />
                        <Badge color={charactersCount <= 100 ? "primary" : "danger"}>
                            {charactersCount}/100
                        </Badge>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-primary">Include</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function EditGroupButton(props) {

    const { entity } = props;
    const { put } = useContext(Context);

    const [modal, setModal] = useState(false);
    const [charactersCount, setCharactersCount] = useState(entity.description.length);
    const [group, setGroup] = useState({
        ...entity
    });

    function openCloseModal() {
        setModal(!modal);
    }

    function submit() {

        put(group, "group");
        openCloseModal();
        event.preventDefault();
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setGroup({ ...group, [name]: value });

        if (name === "description") {
            setCharactersCount(value.length);
        }
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-secondary me-4">Edit</button>

            <Modal isOpen={modal}>
                <form onReset={openCloseModal} onSubmit={submit}>
                    <ModalBody>
                        <label className="form-label">Name</label>
                        <input name="name" type="text" className="form-control"
                            onChange={handleChange}
                            value={group && group.name} required />

                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control"
                            onChange={handleChange}
                            value={group && group.description} required />
                        <Badge color={charactersCount <= 100 ? "primary" : "danger"}>
                            {charactersCount}/100
                        </Badge>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-secondary">Edit</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function Details(props) {

    const { id, name } = props.entity;

    return (
        <Link to={`/group/${name}/${id}`}
            className="btn btn-primary me-4" >
            Details
        </Link>
    )
}

export function AddToGroup() {

    const { contact, addContactToGroup } = useContext(Context);
    const { id } = useParams();

    const [modal, setModal] = useState(false);
    const [contactsWithoutGroup, setContactsWithoutGroup] = useState(contact.filter(contact => contact.groupId === null));
    const [selectedContact, setSelectedContact] = useState({ ...contactsWithoutGroup[0] });

    function openCloseModal() {
        setModal(!modal);
    }

    async function submit() {

        if (contactsWithoutGroup.length > 0) {
            addContactToGroup(selectedContact.id, parseInt(id));
        }
        openCloseModal();
        event.preventDefault();
    }

    useMemo(() => {
        setContactsWithoutGroup(contact.filter(contact => contact.groupId === null));
        setSelectedContact({ ...contactsWithoutGroup[0] });
    }, [contact])

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-primary mt-5 px-4">Add contact to group</button>

            <Modal isOpen={modal}>
                <ModalHeader>Select a contact</ModalHeader>
                <form onReset={openCloseModal} onSubmit={submit}>

                    <ModalBody>
                        <UncontrolledDropdown>
                            <DropdownToggle>
                                {contactsWithoutGroup.length == 0 ?
                                    (<>Não há contatos sem grupo</>) : selectedContact.name}
                            </DropdownToggle>
                            <DropdownMenu dark>
                                {contactsWithoutGroup.map(contact => (
                                    <DropdownItem onClick={() => setSelectedContact(contact)} key={contact.id}>{contact.name}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-primary">Add</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function RemoveFromGroup(props) {

    const { contact, groupId } = props;
    const { removeContactFromGroup } = useContext(Context);

    const [modal, setModal] = useState(false);

    function openCloseModal() {
        setModal(!modal);
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-danger">Remove</button>

            <Modal isOpen={modal}>
                <ModalHeader>Are you sure you want to remove {contact.name} from this group?</ModalHeader>
                <ModalFooter>
                    <button onClick={() => {
                        removeContactFromGroup(contact.id, groupId);
                        openCloseModal();
                    }}
                        className="btn btn-danger">Remove</button>
                    <button onClick={openCloseModal} className="btn btn-secondary">Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export function DeleteButton(props) {

    const { entity, entityType } = props;
    const { deleteEntity } = useContext(Context);
    const [modal, setModal] = useState(false);

    function openCloseModal() {
        setModal(!modal);
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-danger">Delete</button>

            <Modal isOpen={modal}>
                <ModalHeader >
                    Are you sure you want to delete this {entityType}: <b>{entity && entity.id}</b>
                </ModalHeader>
                <ModalFooter>
                    <button onClick={() => {
                        deleteEntity(entity.id, entityType);
                        openCloseModal();
                    }}
                        className="btn btn-danger">Yes, delete {entityType}</button>
                    <button onClick={openCloseModal} className="btn btn-secondary">Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}
