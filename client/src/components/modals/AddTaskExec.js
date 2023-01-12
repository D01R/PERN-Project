import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Context} from "../../index";
import { createExec } from "../../http/taskAPI";
import Pages from "../Pages";
import RoleBar from "../RoleBar";
import Search from "../Search";
import UserList from "../UserList";
import { fetchUsers } from "../../http/userAPI";

const AddTaskExec = observer(({show, onHide}) => {
    const {workspace} = useContext(Context)

    const {id} = useParams()

    useEffect(()=>{
        fetchUsers(workspace.q,workspace.selectedRole,workspace.page,workspace.limit).then(data => {
            workspace.setUsers(data.rows)
            workspace.setTotalCount(data.count)
        })
    })

    useEffect(()=>{
        fetchUsers(workspace.q,workspace.selectedRole,workspace.page,workspace.limit).then(data => {
            workspace.setUsers(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[workspace,workspace.q,workspace.selectedRole,workspace.page])

    const addExec = () => {
        try{
            if(workspace.selectedUser === -1) {
                alert('Select Exec')
                return
            }
            createExec(id,workspace.selectedUser).then(data=>{
                workspace.setSelectedUser({})
                onHide()
            })
        } catch(e){
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
                    Add Exec
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RoleBar/>
                <Search/>
                <UserList/>
                <Pages/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                <Button variant="outline-success" onClick={addExec}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})


export default AddTaskExec