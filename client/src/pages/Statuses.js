import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchStatuses } from '../http/statusAPI'
import { Button, Container, Row } from 'react-bootstrap'
import CreateStatus from '../components/modals/CreateStatus'

const Statuses = observer(() => {
    const {workspace} = useContext(Context)
    const [statusVisible, setStatusVisible] = useState(false)

    useEffect(()=> {
        fetchStatuses().then(data => {
            workspace.setStatuses(data)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        fetchStatuses().then(data => {
            workspace.setStatuses(data)
        })
    }, [workspace.statuses,]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Row className='d-flex flex-column mt-3 mb-3'>
                <h1>Statuses</h1>
                {workspace.statuses.map((status,index) => 
                    <Row key={status.id} style={{background: index % 2 === 0 ? 'lightgray': 'transparent', padding: 10}}>
                        {index+1}: {status.name}
                    </Row>
                )}
            </Row>
            <Button
                variant={'outline-dark'}
                className='mt-4 p-2'
                onClick={() => {setStatusVisible(true)}}
            >
                Add Status
            </Button>
            <CreateStatus show={statusVisible} onHide={() => setStatusVisible(false)}/>
        </Container>
    )
})

export default Statuses