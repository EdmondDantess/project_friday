import axios from 'axios';
import {instanceForRestore} from './restorePasswordApi';

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACK_URL || "https://neko-back.herokuapp.com/2.0",
})

export const loginApi = (email: string, password: string, rememberMe: boolean) => {  
    return instanceForRestore.post(`auth/login`,  {email: email, password: password , rememberMe: rememberMe})

}

export const registerApi = (email: string, password: string) => {  
    return instanceForRestore.post(`auth/register`,  {email: email, password: password})
}