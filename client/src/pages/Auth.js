import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../index'
import { login } from '../http/userAPI'
import { USER_MAIN_ROUTE } from '../utils/consts'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data
            data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(USER_MAIN_ROUTE)
        } catch(e){
            alert(e.response.data.message)
        }
    }

    return(
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>Авторизация</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите пароль..."
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <Row className='d-flex justify-content-center mt-3 p-3'>
                        <Button style={{width:'fit-content'}} variant={'outline-success'} onClick={click}>
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth