import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Row } from "react-bootstrap"
import {Context} from '../index'
import ClientItem from './ClientItem'

const ClientList = observer(() => {
    const {workspace} = useContext(Context)
    return(
        <Row className="d-flex">
            {workspace.clients.map(client => 
                <ClientItem key={client.id} client={client}/>
            )}
        </Row>
    )
})

export default ClientList