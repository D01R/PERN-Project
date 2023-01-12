import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ClientList from '../components/ClientList'
import CreateClient from '../components/modals/CreateClient'
import Pages from '../components/Pages'
import Search from '../components/Search'
import { fetchClients } from '../http/clientAPI'
import { Context } from '../index'

const Clients = observer(() => {
    const {workspace} = useContext(Context)
    
    const [clientVisible,setClientVisible] = useState(false)

    useEffect(() => {
        fetchClients(null, workspace.page, workspace.limit).then(data => {
            workspace.setPage(workspace.page !== 1? 1 : workspace.page)
            workspace.setClients(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchClients(workspace.q, workspace.page, workspace.limit).then(data => {
            workspace.setClients(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[workspace.q, ]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Col md={12}>
                <Container className='mt-3 d-flex justify-content-between'>
                    <Col md={10}>
                        <h2>Clients</h2>
                    </Col>
                    <Col md={2} className='d-flex justify-content-end'>
                        <Button
                            variant={'outline-dark'}
                            onClick={()=> setClientVisible(true)}
                        >
                            Add Client
                        </Button>
                    </Col>
                </Container>
                <Row>
                    <Search/>
                    <ClientList/>
                    <Pages/>
                </Row>
            </Col>
            <CreateClient show={clientVisible} onHide={() => setClientVisible(false)} client={{name:'',surname:'',phone:'',email:''}}/>
        </Container>
    )
})

export default Clients