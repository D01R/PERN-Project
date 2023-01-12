import React, { useContext, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import { editStatusTask } from "../../http/taskAPI";

const ChangeStatus = ({show, onHide}) => {
    const {workspace} = useContext(Context)
    const [value, setValue] = useState(null)
    const {id} = useParams()

    const changeStatus = () => {
        try{
            if (value === null){
                alert('Choice Status')
                return
            }
            editStatusTask(id, value).then(data => {
                setValue(null)
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
                <Modal.Title id='contained-modal-title-vcenter'>
                    Change Status
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{value === null? 'Choice Status': value.name}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {workspace.statuses.map(status => 
                            <Dropdown.Item key={status.id} onClick={()=> setValue(status)}>{status.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Cancel</Button>
                <Button variant='outline-success' onClick={changeStatus}>Change</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeStatus