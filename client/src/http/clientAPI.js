import { $authHost, $host} from "./index";

export const fetchClients = async (q, page, limit) => {
    const {data} = await $authHost.get('api/client', {params: {q, page, limit}})
    return data
}

export const fetchOneClient = async (id) => {
    const {data} = await $authHost.get('api/client/' + id)
    return data
}

export const createClient = async (client) => {
    const {data} = await $host.post('api/client',client)
    return data
}

export const editClient = async (id, client) => {
    const {data} = await $authHost.put('api/client/'+id,client)
    return data
}