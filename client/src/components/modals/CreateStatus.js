import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createStatus } from "../../http/statusAPI";

const CreateStatus = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addStatus = () => {
        try{
            createStatus({name: value}).then(data => {
                setValue('')
                onHide()
            })
        }
        catch(e){
            alert(e.pesponse.data.message)
        }
    }

    return(
        <Modal
            size='lg'
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Add Status
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Enter name of status...'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Cancel</Button>
                <Button variant='outline-success' onClick={addStatus}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateStatus