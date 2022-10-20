import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const profileApi = {
    updateUserInfo(data: updateUserInfoType) {
        return instance.put<UpdatedUserType>('auth/me', data)
    },
    logout() {
        return instance.delete<logoutType>('auth/me', {})
    },
    getUserInfo() {
        return instance.post<GetUserTypeInfo>('auth/me', {})
    },

}

export type updateUserInfoType = {
    name: string,
    avatar: string // url or base64
}

export type responseUpdateUserInfo = {
    addedUser: any     // не важные данные, просто для проверки
    error?: string;
}

export type logoutType = {
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