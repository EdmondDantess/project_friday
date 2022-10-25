import axios from 'axios';
import {instanceForRestore} from './restorePasswordApi';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const profileApi = {
    updateUserInfo(data: UpdateUserInfoType) {
        return instanceForRestore.put<UpdatedUserType>('auth/me', data)
    },
    logout() {
        return instanceForRestore.delete<LogoutType>('auth/me')
    },
    getUserInfo() {
        return instanceForRestore.post<GetUserTypeInfo>('auth/me')
    },

}

export type UpdateUserInfoType = {
    name: string,
    avatar: string // url or base64
}

export type ResponseUpdateUserInfo = {
    addedUser: any     // не важные данные, просто для проверки
    error?: string;
}

export type LogoutType = {
    info: string
    error: string;
}

export type UpdatedUserType = {
    updatedUser: UpdatedUserTypeUpdatedUser;
    token: string;
    tokenDeathTime: number;
}

export type UpdatedUserTypeUpdatedUser = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar?: any;
}

type GetUserTypeInfo = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}