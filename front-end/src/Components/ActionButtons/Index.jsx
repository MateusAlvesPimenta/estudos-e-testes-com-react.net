import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Context } from "../Context/Index";

export function AddButton(props) {

    const { entityType } = props;
    const { post } = useContext(Context)
    const [modal, setModal] = useState(false)
    const [contact, setContact] = useState({
        id: "",
        name: "",
        phoneNumber: "",
        active: ""
    })

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
        openCloseModal()
        event.preventDefault();
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-primary px-4">New contact</button>

            <Modal isOpen={modal}>
                <ModalHeader>New {entityType}</ModalHeader>
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
                        <button type="reset" className="btn btn-secondary">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function EditButton(props) {

    const { entity, entityType } = props;
    const { put } = useContext(Context)

    const [modal, setModal] = useState(false)
    const [contact, setContact] = useState({
        ...entity
    })

    function openCloseModal() {
        setModal(!modal)
    }

    function handleChange(e) {

        const { name, value, checked } = e.target;

        setContact({
            ...contact, [name]: value, active: checked
        })
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
                <ModalHeader>Edit {entityType}</ModalHeader>
                <form onReset={openCloseModal} onSubmit={submit}>
                    <ModalBody>
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input type="text" name="name"
                                onChange={handleChange}
                                className="form-control mb-3"
                                value={contact && contact.name} required/>

                            <label className="form-label" >Phone Number</label>
                            <input type="tel" name="phoneNumber" 
                                placeholder="0000-0000"
                                pattern="^[0-9]{4}-[0-9]{4}$"
                                onChange={handleChange}
                                className="form-control mb-3"
                                value={contact && contact.phoneNumber} required/>

                            <div className="form-check">
                                <input id="active" type="checkbox" name="active"
                                    onChange={handleChange}
                                    className="form-check-input"
                                    checked={contact && contact.active} />
                                
                                <label for="active" className="form-check-label" >Active</label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-primary">Edit</button>
                        <button type="reset" className="btn btn-secondary">Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}

export function DeleteButton(props) {

    const { entity, entityType } = props;
    const { deleteContact } = useContext(Context)
    const [modal, setModal] = useState(false)

    function openCloseModal() {
        setModal(!modal)
    }

    return (
        <>
            <button onClick={openCloseModal} className="btn btn-danger">Delete</button>

            <Modal isOpen={modal}>
                <ModalHeader >
                    Are you sure you want to delete this {entityType}: <b>{entity && entity.name}</b>
                </ModalHeader>
                <ModalFooter>
                    <button onClick={() => {
                        deleteContact(entity.id)
                        openCloseModal()}}
                        className="btn btn-danger">Yes, delete {entityType}</button>
                    <button onClick={openCloseModal} className="btn btn-secondary">Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}
