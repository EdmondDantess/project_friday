import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

export const loginApi = (email: string, password: string, rememberMe: boolean) => {  
    return instance.post(`auth/register`,  {email: email, password: password , rememberMe: rememberMe}).then(response => {
        console.log(response)
        return response; 
    })
}