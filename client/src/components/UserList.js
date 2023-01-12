import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import UserItem from "./UserItem";

const UserList = observer(() => {
    const {workspace} = useContext(Context)

    return(
        <Row className="d-flex">
            {workspace.users.map(user => 
                <UserItem key={user.id} user={user}/>
            )}
        </Row>
    )
})

export default UserList