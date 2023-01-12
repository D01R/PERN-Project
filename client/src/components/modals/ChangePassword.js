import React, { useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import { editPassword } from "../../http/userAPI";

const ChangePassword = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const changePass = () => {
        try{
            editPassword(value).then(data => {
                setValue('')
                onHide()
            })
        } catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Enter new password"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Cancel</Button>
                <Button variant='outline-success' onClick={changePass}>Change</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangePassword