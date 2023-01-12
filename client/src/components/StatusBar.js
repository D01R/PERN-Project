import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";

const StatusBar = observer(() => {
    const {workspace} = useContext(Context)
    return(
        <Row className='d-flex'>
            {workspace.statuses.map(status => 
                <Card
                    key = {status.id}
                    className='p-3 m-1'
                    style={{width: 'fit-content', cursor: 'pointer'}}
                    onClick={() => workspace.setSelectedStatus(status)}
                    border = {status.id === workspace.selectedStatus.id? 'dark': 'light'}
                >
                    {status.name}
                </Card>    
            )}
        </Row>
    )
})

export default StatusBar 