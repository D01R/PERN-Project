import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TASK_ROUTE } from "../utils/consts";
import task_icon from "../assets/task_icon.png"

const TaskItem = ({task}) => {
    const navigate = useNavigate()

    return(
        <Card className='m-2 p-2' border={'dark'} onClick={() => navigate(TASK_ROUTE + '/' + task.id)}>
            <Row>
                <Col md={1}>
                    <Image className="me-2 mt-2" src={task_icon} width={60} height={60}/>
                </Col>
                <Col md={9} className='d-flex align-items-start flex-column'>
                    <p style={{fontSize: 20, marginBottom: 0}}>{task.title + ' - ' + task.price + 'rub. Deadline: ' + task.deadline}</p>
                    <p style={{fontSize: 20, marginBottom: 0}}>{`Status: ${task.status.name}`}</p>
                </Col>
            </Row>
        </Card>
    )
}

export default TaskItem