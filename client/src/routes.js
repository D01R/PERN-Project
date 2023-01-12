import { CLIENTS_ROUTE, CLIENT_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, STATUSES_ROUTE, TASKS_ROUTE, TASK_ROUTE, USERS_ROUTE, USER_MAIN_ROUTE } from "./utils/consts"
import Landing from "./pages/Landing"
import Auth from './pages/Auth'
import Client from './pages/Client'
import Clients from './pages/Clients'
import Statuses from './pages/Statuses'
import Task from './pages/Task'
import Tasks from './pages/Tasks'
import UserMain from './pages/UserMain'
import Users from './pages/Users'

export const authRoutes = [
    {
        path: CLIENT_ROUTE + '/:id',
        Component: Client
    },
    {
        path: CLIENTS_ROUTE,
        Component: Clients
    },
    {
        path: STATUSES_ROUTE,
        Component: Statuses
    },
    {
        path: TASK_ROUTE + '/:id',
        Component: Task
    },
    {
        path: TASKS_ROUTE,
        Component: Tasks
    },
    {
        path: USER_MAIN_ROUTE,
        Component: UserMain
    },
    {
        path: USERS_ROUTE,
        Component: Users
    },
]

export const publicRoutes = [
    {
        path: LANDING_ROUTE,
        Component: Landing
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]