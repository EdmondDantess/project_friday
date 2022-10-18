import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

export const loginApi = (email: string, password: string, rememberMe: boolean) => {  
    return instance.get(`auth/register`).then(response => {
        return response.data; 
    })
}