import { $authHost } from "."

export const createTask = async (task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const fetchTasks = async (statusId, page, limit) => {
    const {data} = await $authHost.get('api/task',{params: {statusId, page, limit}})
    return data
}

export const fetchMyTasks = async (page, limit) => {
    const {data} = await $authHost.get('api/task/mytasks',{params: {page, limit}})
    return data
}

export const createExec = async(id,executor) => {
    const {data} = await $authHost.post('api/task/'+id, {userId: executor})
    return data
}

export const fetchOneTask = async(id) => {
    const {data} = await $authHost.get('api/task/'+id)
    return data
}

export const editStatusTask = async(id, status) => {
    const {data} = await $authHost.put('api/task/'+id,{status})
    return data
}