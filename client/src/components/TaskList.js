import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import TaskItem from "./TaskItem";

const TaskList = observer(() => {
    const {workspace} = useContext(Context)
    return(
        <Row className='d-flex'>
            {workspace.tasks.map(task => 
                <TaskItem key={task.id} task={task}/>
            )}
        </Row>
    )
})

export default TaskList