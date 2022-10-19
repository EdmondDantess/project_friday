import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const profileApi = {
    updateUserInfo(data: updateUserInfoType) {
        return instance.put("auth/me", data)
    },
    logout() {
        return instance.delete("auth/me", {})
    },
    getUserInfo() {
        return instance.post("auth/me", {})
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