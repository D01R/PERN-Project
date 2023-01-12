import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Context } from "..";
import client_icon from '../assets/client_icon.png';
import { TASK_ROUTE } from "../utils/consts";

const UserItem = observer(({user}) => {
    const {workspace} = useContext(Context)
    const [isSelected,setIsSelected] = useState(false)

    const location = useLocation()
    const isAddTask = location.pathname.slice(0,15) === TASK_ROUTE && location.pathname.slice(15,16)!=='s'

    return(
        <Card 
            className='mt-2 mb-2 p-2' 
            border={isSelected? 'light': 'dark'} 
            onClick={(e) => {
                setIsSelected(true)
                workspace.setSelectedUser(isAddTask? user.id: -1)
            }}
        >
            <Row>
                <Col md={1}>
                    <Image className="me-2 mt-2" src={client_icon} width={60} height={60}/>
                </Col>
                <Col md={9} style={{textAlign: 'left'}} className='d-flex align-items-center'>
                    {user.name} {user.surname}
                </Col>
                <Col md={2} className='d-flex align-items-center'>
                    {user.role}
                </Col>
            </Row>
        </Card>
    )
})

export default UserItem