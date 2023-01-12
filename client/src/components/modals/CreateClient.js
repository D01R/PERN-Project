import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { createClient, editClient } from "../../http/clientAPI";
import { CLIENTS_ROUTE, LANDING_ROUTE } from "../../utils/consts";

const CreateClient = observer(({show, onHide, client}) => {
    const location = useLocation()
    const isNotEdit = location.pathname === CLIENTS_ROUTE || location.pathname === LANDING_ROUTE
    

    const [name, setName] = useState(client.name)
    const [surname, setSurname] = useState(client.surname)
    const [phone, setPhone] = useState(client.phone)
    const [email, setEmail] = useState(client.email)
    const {id} = useParams()


    const addClient = () => {
        try{
            if (isNotEdit){
                createClient({name, surname, phone, email}).then(data => {
                    setName('')
                    setSurname('')
                    setPhone('')
                    setEmail('')
                    onHide()
                })
            }else{
                editClient(id,{name,surname,phone,email}).then(data => {
                    onHide()
                })
            }
        }
        catch(e){
            alert(e.response.data.message)
        }
    }
    return(
        <Modal
            size="lg"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isNotEdit?
                        'Add client'
                        :
                        'Edit client'
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={name}
                        className='mb-3'
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter name..."
                    />
                    <Form.Control 
                        value={surname}
                        className='mb-3'
                        onChange={e => setSurname(e.target.value)}
                        placeholder="Enter surname..."
                    />
                    <Form.Control 
                        value={phone}
                        className='mb-3'
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Enter phone..."
                    />
                    <Form.Control 
                        value={email}
                        className='mb-3'
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email..."
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                {isNotEdit?
                    <Button variant="outline-success" onClick={addClient}>Add</Button>
                    :
                    <Button variant="outline-success" onClick={addClient}>Edit</Button>
                }
            </Modal.Footer>
        </Modal>
    )
})

export default CreateClient