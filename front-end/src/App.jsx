import React, { useEffect, useState } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

function App() {

  const baseUrl = "http://localhost:5000/Contact";

  const [data, setData] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  const [modalInclude, setModalInclude] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);

  let [contact, setContact] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    active: ""
  })

  const openCloseModalInclude = () => {
    setModalInclude(!modalInclude);
  }

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const getRequest = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const getByNameRequest = async () => {
    if (contact.name.length === 0) {
      getRequest();
    }
    else {
      await axios.get(`${baseUrl}/GetContactsByName/${contact.name}`, contact.name)
        .then(response => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          if (error.response.status === 404) {
            setData([]);
          }
          console.log(error);
        });
    }
  }

  const postRequest = async () => {
    delete contact.id;
    await axios.post(`${baseUrl}/NewContact`, contact)
      .then(response => {
        setData(data.concat(response.data));
        setUpdateData(true);
        openCloseModalInclude();
      }).catch(error => {
        console.log(error);
      });
  }

  const putRequest = async () => {
    await axios.put(`${baseUrl}/EditContact/${contact.id}`, contact)
      .then(() => {
        setUpdateData(true);
        openCloseModalEdit();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteRequest = async () => {
    await axios.delete(`${baseUrl}/DeleteContact/${contact.id}`, contact.id)
      .then(() => {
        setUpdateData(true);
        openCloseModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }

  const selectContact = (contact, option) => {
    setContact(contact);

    if (option === "EDIT")
      openCloseModalEdit();

    else
      openCloseModalDelete();
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setContact({
      ...contact, [name]: value, active: checked
    });
    console.log(contact);
  }

  useEffect(() => {
    getRequest();
    setUpdateData(false);
  }, [updateData]);

  return (
    <div className="container">
      <header className="my-5">
        <h1>Contacts list</h1>
        <br />
        <button onClick={openCloseModalInclude} className="btn btn-primary px-4">New contact</button>
      </header>

      <div className='row my-3'>
        <div className='col'>
          <input id='test' type='text' className='form-control' name='name' onChange={handleChange} />
          <button className='btn btn-secondary form-control my-3' onClick={getByNameRequest} >Filter by name</button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Active</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.phoneNumber}</td>
              <td><input type="checkbox" disabled checked={contact.active} /></td>
              <td>
                <button onClick={() => selectContact(contact, "EDIT")} className="btn btn-secondary me-4">Edit</button>
                <button onClick={() => selectContact(contact, "DELETE")} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInclude}>
        <ModalHeader>New contact</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" name="name" onChange={handleChange}
              className="form-control mb-3" />

            <label className="form-label" >Phone Number</label>
            <input type="text" name="phoneNumber" onChange={handleChange}
              className="form-control mb-3" />

            <div className="form-check">
              <input type="checkbox" id="active" name="active" onChange={handleChange}
                className="form-check-input" />
              <label for="active" className="form-check-label" >Active</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={postRequest} className="btn btn-primary">Include</button>
          <button onClick={openCloseModalInclude} className="btn btn-secondary">Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit contact</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="form-label">Id</label>
            <input type="number" disabled className="form-control"
              value={contact && contact.id} />

            <label className="form-label">Name</label>
            <input type="text" name="name" onChange={handleChange} className="form-control mb-3"
              value={contact && contact.name} />

            <label className="form-label" >Phone Number</label>
            <input type="text" name="phoneNumber" onChange={handleChange} className="form-control mb-3"
              value={contact && contact.phoneNumber} />

            <div className="form-check">
              <input type="checkbox" id="active" name="active" onChange={handleChange} className="form-check-input"
                checked={contact && contact.active} />
              <label for="active" className="form-check-label" >Active</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={putRequest} className="btn btn-primary">Edit</button>
          <button onClick={openCloseModalEdit} className="btn btn-secondary">Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalHeader >
          Are you sure you want to delete this contact: <b>{contact && contact.name}</b>
        </ModalHeader>
        <ModalFooter>
          <button onClick={deleteRequest} className="btn btn-danger">Yes, delete contact</button>
          <button onClick={openCloseModalDelete} className="btn btn-secondary">Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
