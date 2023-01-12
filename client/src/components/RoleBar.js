import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";

const RoleBar = observer(() => {
    const {workspace} = useContext(Context)
    const roles = [
        'ADMIN',
        'MANAGER',
        'EXECUTOR'
    ]

    return(
        <Row className="d-flex">
            {roles.map(role =>
                <Card
                    key={role}
                    className='p-1 m-1'
                    style={{width: 'fit-content', cursor: 'pointer'}}
                    onClick={()=>workspace.setSelectedRole(role)}
                    border={role === workspace.selectedRole? 'dark': 'light'}
                >
                    {role}
                </Card>
            )}
        </Row>
    )
})

export default RoleBar