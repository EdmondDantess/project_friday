import {instance} from "./instance";

export const userAuthAPI = {
    updateUserInfo(data: UpdateUserInfoType) {
        return instance.put<UpdatedUserType>("auth/me", data)
    },
    logout() {
        return instance.delete<LogoutResponseType>("auth/me")
    },
    getUserInfo() {
        return instance.post<UserInfoType>("auth/me")
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserInfoType>(`auth/login`, {email: email, password: password, rememberMe: rememberMe})
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`auth/register`, {email: email, password: password})
    },
    restorePassword(data: RestorePassDataType) {
        return instance.post<ForgotResponseType>(`/auth/forgot/`, data)
    },
    newPassword(data: newPassDataType) {
        return instance.post<NewPassResponseType>(`/auth/set-new-password`, data)
    },
}

export type UpdateUserInfoType = {
    name: string,
    avatar: string | null // url or base64
}

export type UpdatedUserType = {
    updatedUser: UserInfoType & AdditionalUserDataType;
    token: string;
    tokenDeathTime: number;
}

export type UserInfoType = {
    _id: string;
    email: string;
    name: string;
    avatar: string | null;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type AdditionalUserDataType = {
    __v: number;
    token: string;
    tokenDeathTime: number;
}

export type RegisterResponseType = {
    addedUser: UserInfoType     // не важные данные, просто для проверки
    error?: string;
}

export type LogoutResponseType = {
    info: string
    error: string
}

export type RestorePassDataType = {
    email: string
    from: string
    message: string
}

export type newPassDataType = {
    password: string
    resetPasswordToken: string | undefined
}

type ForgotResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

type NewPassResponseType = {
    info: string
}


