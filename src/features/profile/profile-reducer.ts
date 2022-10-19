import {profileApi, updateUserInfoType} from "../../api/profileApi";
import {AppThunk} from "../../app/store";


type initStateType = {
    isLogged: boolean
    name: string
    email: string
}

const initialState: initStateType = {
    isLogged: true,
    name: "Loading...",
    email: "Loading..."
}

export const profileReducer = (state: initStateType = initialState, action: ProfileActionsType): initStateType => {
    switch (action.type) {
        case "profile/SET-USERNAME":
            return {...state, name: action.name}
        case "profile/SET-EMAIL":
            return {...state, email: action.email}
        case "profile/SET-ISLOGGED":
            return {...state, isLogged: action.value}
        default:
            return state
    }
}

export const setUserNameAC = (name: string) => {
    return {
        type: "profile/SET-USERNAME",
        name
    } as const
}
export const setUserEmailAC = (email: string) => {
    return {
        type: "profile/SET-EMAIL",
        email
    } as const
}
export const setIsLoggedAC = (value: boolean) => {
    return {
        type: "profile/SET-ISLOGGED",
        value
    } as const
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        let res = await profileApi.logout()
        dispatch(setIsLoggedAC(false))
    } catch (e: any) {
        alert(e.response.data.error)
    }
}
export const updateUserInfoTC = (data: updateUserInfoType): AppThunk => async (dispatch) => {
    try {
        let res = await profileApi.updateUserInfo(data)
        dispatch(getUserInfoTC())
    } catch (e: any) {
        alert(e.response.data.error)
    }
}
export const getUserInfoTC = (): AppThunk => async (dispatch) => {
    try {
        let res = await profileApi.getUserInfo()
        dispatch(setUserNameAC(res.data.data.name))
        dispatch(setUserEmailAC(res.data.data.name))
    } catch (e: any) {
        alert(e.response.data.error)
    }
}

type setUserNameType = ReturnType<typeof setUserNameAC>
type setUserEmailType = ReturnType<typeof setUserEmailAC>
type setIsLoggedType = ReturnType<typeof setIsLoggedAC>

export type ProfileActionsType = setUserNameType
    | setUserEmailType
    | setIsLoggedType

