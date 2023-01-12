import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTE } from "../utils/consts";
import client_icon from '../assets/client_icon.png'

const ClientItem = ({client}) => {
    const navigate = useNavigate()
    return(
        <Card className='m-2 p-2' border={'dark'} onClick={() => navigate(CLIENT_ROUTE + '/' + client.id)}>
            <Row>
                <Col md={1}>
                    <Image className="me-2" src={client_icon} width={60} height={60}/>
                </Col>
                <Col md={9} className='d-flex align-items-center'>
                    <p style={{fontSize: 25, marginBottom: 0}}>{client.surname + ' ' + client.name}</p>
                </Col>
            </Row>
        </Card>
    )
}

export default ClientItem