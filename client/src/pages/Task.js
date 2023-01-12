import React, { useContext, useEffect, useState } from 'react'
import { fetchOneTask } from '../http/taskAPI'
import { useParams } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import UserItem from '../components/UserItem'
import AddTaskExec from '../components/modals/AddTaskExec'
import { fetchStatuses } from '../http/statusAPI'
import { Context } from '..'
import ChangeStatus from '../components/modals/ChangeStatus'


const Task = () => {
    const {workspace} = useContext(Context)
    const [execVisible, setExecVisible] = useState(false)
    const [statusVisible, setStatusVisible] = useState(false)
    const [task, setTask] = useState({taskUsers:[],status:{}})
    const {id} = useParams()
    
    
    useEffect(()=>{
        fetchOneTask(id).then(data => {
            setTask(data)
        })
        fetchStatuses().then(data => {
            workspace.setStatuses(data)
        })
    })
    
    
    
    return (
        <Container>
            <Card className='d-flex flex-column align-items-start justify-content-around p-3' style={{height:'fir-content'}} border={'dark'}>
                <h1>Task</h1>
                <h2>{task.title}</h2>
                <p>{task.descriptin}</p>
                <p>{`Cost ${task.price} rub.`}</p>
                <p>{`Deadline ${task.deadline}`}</p>
                <p>{`Quarent status: ${task.status.name}`}</p>
            </Card>
            <div>
                {task.taskUsers.map(usr =>
                    <UserItem key={usr.userId} user={usr.user}/>
                )}
            </div>
            <div className='mt-3 d-flex justify-content-between'>
                <Button 
                    onClick={() => setExecVisible(true)}
                    style={{width: 'fit-content'}}
                    variant={'outline-dark'}
                >
                    Add exec
                </Button>
                <Button
                    style={{width: 'fit-content'}}
                    variant={'outline-dark'}
                    onClick={()=>setStatusVisible(true)}
                >
                    Edit status
                </Button>
            </div>
            <AddTaskExec show={execVisible} onHide={() => setExecVisible(false)}/>
            <ChangeStatus show={statusVisible} onHide={() => setStatusVisible(false)}/>
        </Container>
    )
}

export default Task