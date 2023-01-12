import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import ChangePassword from '../components/modals/ChangePassword'
import Pages from '../components/Pages'
import TaskList from '../components/TaskList'
import { fetchMyTasks } from '../http/taskAPI'

const UserMain = () => {
    const {workspace} = useContext(Context)
    
    const [passVisible,setPassVisible] = useState(false)

    useEffect(() => {
        fetchMyTasks(1,workspace.limit).then(data => {
            workspace.setPage(workspace.page !== 1? 1 : workspace.page)
            workspace.setTasks(data.rows)
            workspace.setTotalCount(data.count)
        })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchMyTasks(workspace.page,workspace.limit).then(data => {
            workspace.setTasks(data.rows)
            workspace.setTotalCount(data.count)
        })
    }, [workspace.page]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Row>
                If you wanna change your password, click this link 
                <Button variant='outline-dark' onClick={() => setPassVisible(true)}>Edit password</Button>
            </Row>
            <Row>
                <h1>My Tasks</h1>
                <TaskList/>
                <Pages/>
            </Row>
            <ChangePassword show={passVisible} onHide={() => setPassVisible(false)}/>
        </Container>
    )
}

export default UserMain