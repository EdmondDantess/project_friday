import axios from "axios";

export const instanceDoesntWorkWithLocalBack = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const instanceForRestore = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || "https://neko-back.herokuapp.com/2.0",
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const forgotPasswordAPI = {
    restorePassword(email: string) {
        const promise = instanceForRestore.post<ResponseType<ForgotResponseType>>(
            `/auth/forgot/`,
            {
                email: email, // кому восстанавливать пароль
                from: "test-front-admin <dmitrykorotaev.job@gmail.com>",
                // можно указать разработчика фронта)
                message: `<div style="padding: 15px"> password recovery link: <a href='http://localhost:3000/#/newpass/$token$'>link</a></div>`
            },
        )
        return promise
    },

    newPassword(password: string, token: string) {
        const promise = instanceForRestore.post<ResponseType<NewPassResponseType>>(
            `/auth/set-new-password`,
            {
                password: password,
                resetPasswordToken: token,
            },
        )
        return promise
    },
}

type ResponseType<T> = {
    data: T
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


