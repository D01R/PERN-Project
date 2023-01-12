import React, { useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { registration } from "../../http/userAPI";

const CreateUser = ({show, onHide}) => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')

    const roles = [
        'ADMIN',
        'MANAGER',
        'EXECUTOR'
    ]

    const addUser = () => {
        try{
            registration(email,password,name,surname,phone,role).then(data => {
                setEmail('')
                setPassword('')
                setName('')
                setSurname('')
                setPhone('')
                setRole('')
                onHide()
            })
        } catch(e){
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
                    Add User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={email}
                        className='mb-3'
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email..."
                    />
                    <Form.Control 
                        value={password}
                        className='mb-3'
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password..."
                    />
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
                    <Dropdown className="mb-2">
                        <Dropdown.Toggle>{role === ''? 'Choice role..': role}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {roles.map(rol => 
                                <Dropdown.Item key={rol} onClick={() => setRole(rol)}>{rol}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                <Button variant="outline-success" onClick={addUser}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateUser