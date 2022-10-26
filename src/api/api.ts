import axios from 'axios';
import {instanceForRestore} from './restorePasswordApi';

export const loginApi = (email: string, password: string, rememberMe: boolean) => {
    return instanceForRestore.post(`auth/login`,  {email, password, rememberMe})
}

export const registerApi = (email: string, password: string) => {  
    return instanceForRestore.post(`auth/register`,  {email: email, password: password})
}

export const getPackApi = () => {
    return instanceForRestore.get(`cards/pack`).then((response) => {
        console.log(response)
        return response;
    })
}

export const getCardApi = () => {
    return instanceForRestore.get(`cards/card?cardsPack_id=63583c5e5ff8d330ecc75372`).then((response) => {
        console.log(response)
        return response;
    })
}

