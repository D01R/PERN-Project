import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createTask } from "../../http/taskAPI";

const CreateTask = observer(({show, onHide, client}) => {
    const [title, setTitle] = useState('')
    const [descriptin, setDescriptin] = useState('')
    const [price, setPrice] = useState(0)
    const [deadline, setDeadline] = useState('')
    const clientId = client

    const addTask = () => {
        try{
            createTask({title, descriptin, price, deadline,clientId}).then(data => {
                setTitle('')
                setDescriptin('')
                setPrice(0)
                setDeadline('')
                onHide()
            })
        }catch(e){
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
                    Add task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={title}
                        className='mb-3'
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter title..."
                    />
                    <Form.Control 
                        value={descriptin}
                        className='mb-3'
                        onChange={e => setDescriptin(e.target.value)}
                        placeholder="Enter description..."
                    />
                    <Form.Control 
                        value={price}
                        className='mb-3'
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Enter price..."
                    />
                    <Form.Control 
                        value={deadline}
                        className='mb-3'
                        onChange={e => setDeadline(e.target.value)}
                        placeholder="Enter deadline ('yyyy-mm-dd')..."
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                <Button variant="outline-success" onClick={addTask}>Add</Button>
            </Modal.Footer>
        </Modal>
        )
    
})

export default CreateTask