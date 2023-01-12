import { $authHost } from "./index"

export const fetchStatuses = async() => {
    const {data} = await $authHost.get('api/status')
    return data
}
export const createStatus = async(status) => {
    const {data} = await $authHost.post('api/status',status)
    return data
}