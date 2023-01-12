import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchUsers } from '../http/userAPI'
import { Button, Container, Row } from 'react-bootstrap'
import UserList from '../components/UserList'
import Pages from '../components/Pages'
import Search from '../components/Search'
import CreateUser from '../components/modals/CreateUser'
import RoleBar from '../components/RoleBar'

const Users = observer(() => {
    const {workspace} = useContext(Context)
    const [userVisible, setUserVisible] = useState(false)

    useEffect(()=>{
        fetchUsers(null,null,workspace.page,workspace.limit).then(data => {
            workspace.setUsers(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        fetchUsers(workspace.q,workspace.selectedRole,workspace.page,workspace.limit).then(data => {
            workspace.setUsers(data.rows)
            workspace.setTotalCount(data.count)
        })
    },[workspace.q,workspace.selectedRole,workspace.page,workspace.limit]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Button 
                style={{width: 'fit-content'}}
                variant={'outline-dark'}
                onClick={() => setUserVisible(true)}
                className='mt-3'
            >
                Add User
            </Button>
            <Row>
                <RoleBar/>
                <Search/>
                <UserList/>
                <Pages/>
            </Row>
            <CreateUser show={userVisible} onHide={() => setUserVisible(false)}/>
        </Container>
    )
})

export default Users