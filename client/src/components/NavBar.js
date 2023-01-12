import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { CLIENTS_ROUTE, LOGIN_ROUTE, STATUSES_ROUTE, TASKS_ROUTE, USERS_ROUTE, USER_MAIN_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(LOGIN_ROUTE)
    }

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to={USER_MAIN_ROUTE}>Main</NavLink>
                {user.isAuth?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {user.user.role ==='ADMIN'?
                            <div>
                                <Button variant={'outline-light'} onClick={()=>navigate(USERS_ROUTE)}>Users</Button>
                                <Button className="ms-2" variant={'outline-light'} onClick={()=>navigate(STATUSES_ROUTE)}>Statuses</Button>
                                <Button className="ms-2" variant={'outline-light'} onClick={()=>navigate(TASKS_ROUTE)}>Tasks</Button>
                                <Button className="ms-2 me-2" variant={'outline-light'} onClick={()=>navigate(CLIENTS_ROUTE)}>Clients</Button>
                            </div>
                            :
                            <div>
                                <Button variant={'outline-light'} onClick={()=>navigate(TASKS_ROUTE)}>Tasks</Button>
                                <Button className="ms-2 me-2" variant={'outline-light'} onClick={()=>navigate(CLIENTS_ROUTE)}>Clients</Button>
                            </div>
                        }
                        <Button variant={'outline-light'} onClick={() => logOut()}>Log Out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={'outline=light'} onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar