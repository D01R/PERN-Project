import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateClient from '../components/modals/CreateClient'

const Landing = () => {
    const [clientVisible,setClientVisible] = useState(false)


    return (
        <Container className='d-flex justify-content-center flex-column'>
            <h1>Landing</h1>
            <Button
                variant={'outline-dark'}
                className='mt-3 p-2'
                onClick={() => {setClientVisible(true)}}
            >
                Leave request
            </Button>
            <CreateClient show={clientVisible} onHide={() => setClientVisible(false)} client={{name:'',surname:'',phone:'',email:''}}/>
        </Container>
    )
}

export default Landing