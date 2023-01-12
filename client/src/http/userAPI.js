import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password,name,surname,phone,role) => {
    const {data} = await $authHost.post('api/user/registration', {email, password,name,surname,phone,role})
    return jwt_decode(data.token)
} 

export const login = async (email,password) =>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
} 

export const check = async () =>{
    const {data} = await $authHost.get('api/user/auth', {})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
} 

export const fetchUsers = async(q,role,page,limit) => {
    const {data} = await $authHost.get('api/user',{params:{q,role,page,limit}})
    return data
}
export const editPassword = async(password) => {
    const {data} = await $authHost.put('api/user',{password})
    return data
}