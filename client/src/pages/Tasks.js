import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../index'
import StatusBar from '../components/StatusBar'
import TaskList from '../components/TaskList'
import { fetchStatuses } from '../http/statusAPI'
import { fetchTasks } from '../http/taskAPI'
import Pages from '../components/Pages'

const Tasks = observer(() => {
    const {workspace} = useContext(Context)

    useEffect(()=> {
        fetchStatuses().then(data => workspace.setStatuses(data))
        fetchTasks(null, workspace.page, workspace.limit).then(data => {
            workspace.setPage(workspace.page !== 1? 1 : workspace.page)
            workspace.setTasks(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        fetchStatuses().then(data => workspace.setStatuses(data))
        fetchTasks(workspace.selectedStatus.id, workspace.page, workspace.limit).then(data => {
            workspace.setTasks(data.rows)
            workspace.setTotalCount(data.count)
        })
    }, [workspace.page,workspace.selectedStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <Container>
            <h1>Tasks</h1>
            <StatusBar/>
            <TaskList/>
            <Pages/>
        </Container>
    )
})

export default Tasks