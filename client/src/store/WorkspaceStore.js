import {makeAutoObservable} from 'mobx'

export default class Workspace{
    constructor(){
        this._statuses = []
        this._users = []
        this._tasks = []
        this._clients = []
        this._exec = []

        this._selectedStatus = {}
        this._q = ''
        this._selectedRole = ''
        this._selectedUser = -1
    

        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setStatuses(statuses){
        this._statuses = statuses
    }
    setUsers(users){
        this._users = users
    }
    setTasks(tasks){
        this._tasks = tasks
    }
    setClients(clients){
        this._clients = clients
    }
    setExec(exec){
        this._exec = exec
    }

    setSelectedStatus(selectedStatus){
        this._selectedStatus = selectedStatus
    }
    setQ(q){
        this._q = q
    }
    setSelectedRole(selectedRole){
        this._selectedRole = selectedRole
    }
    setSelectedUser(selectedUser){
        this._selectedUser = selectedUser
    }

    setTotalCount(count){
        this._totalCount = count
    }
    setPage(page){
        this._page = page
    }

    get statuses(){
        return this._statuses
    }

    get users(){
        return this._users
    }

    get tasks(){
        return this._tasks
    }

    get clients(){
        return this._clients
    }

    get exec(){
        return this._exec
    }

    get selectedStatus(){
        return this._selectedStatus
    }

    get q(){
        return this._q
    }

    get selectedRole(){
        return this._selectedRole
    }

    get selectedUser(){
        return this._selectedUser
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }
}