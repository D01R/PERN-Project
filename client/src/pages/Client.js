import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Context } from '../index'
import TaskList from '../components/TaskList'
import { fetchOneClient } from '../http/clientAPI'
import { observer } from 'mobx-react-lite'
import CreateClient from '../components/modals/CreateClient'
import CreateTask from '../components/modals/CreateTask'

const Client = observer(() => {
    const {workspace} = useContext(Context)
    const [client,setClient] = useState({clientTasks:[]})
    const [clientVisible,setClientVisible] = useState(false)
    const [taskVisible,setTaskVisible] = useState(false)

    const {id} = useParams()
    useEffect(() => {
        fetchOneClient(id).then(data => {
            setClient(data)
            workspace.setTasks(data.clientTasks)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchOneClient(id).then(data => {
            setClient(data)
            workspace.setTasks(data.clientTasks)
        })
    },[workspace.tasks, ]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Container>
            <Col md={12}>
                <h2 className='mt-3'>Client</h2>
                <Card className='d-flex flex-column align-items-start justify-content-around ps-5 m-0' style={{border: '5px solid lightgray'}}>
                    <h2 className='mb-4'>{client.surname + ' ' + client.name}</h2>
                    <p style={{fontSize: 20}}>{`Email: ${client.email}`}</p>
                    <p style={{fontSize: 20}}>{`Phone: ${client.phone}`}</p>
                </Card>
                <TaskList/>
                <Row className='mt-3 d-flex justify-content-between'>
                    <Button
                        variant={'outline-dark'}
                        onClick={()=> setClientVisible(true)}
                        style={{width: 200}}
                    >
                        Edit Client
                    </Button>
                    <Button
                        variant={'outline-dark'}
                        onClick={()=> setTaskVisible(true)}
                        style={{width: 200}}
                    >
                        Add Task
                    </Button>
                </Row>
            </Col>
            <CreateClient show={clientVisible} onHide={() => setClientVisible(false)} client={client}/>
            <CreateTask show={taskVisible} onHide={() => setTaskVisible(false)} client={id}/>
        </Container>
    )
})

export default Client