import {profileApi, UpdateUserInfoType} from '../../api/profileApi';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError, handleErrorAuth} from '../../common/utils/error-utils';


type InitStateType = typeof initialState

const initialState = {
    isLogged: false,
    name: '',
    email: '',
    avatar: 'https://bit.ly/3CKLqoF'
}

export const profileReducer = (state: InitStateType = initialState, action: ProfileActionsType): InitStateType => {
    switch (action.type) {
        case 'profile/SET-USERNAMEEMAIL':
            return {...state, name: action.name, email: action.email}
        case 'profile/SET-ISLOGGED':
            return {...state, isLogged: action.value}
        default:
            return state
    }
}

export const setUserNameEmailAC = (usInfo: { name: string, email: string }) => {
    return {
        type: 'profile/SET-USERNAMEEMAIL',
        name: usInfo.name,
        email: usInfo.email
    } as const
}

export const setIsLoggedAC = (value: boolean) => {
    return {
        type: 'profile/SET-ISLOGGED',
        value
    } as const
}

export const logoutTC = (): AppThunk => async (dispatch) => {

    try {
        dispatch(startCircular())
        let res = await profileApi.logout()
        dispatch(setIsLoggedAC(false))
        dispatch(setUserNameEmailAC({name: '', email: ''}))
    } catch (e: any) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}
export const updateUserInfoTC = (data: UpdateUserInfoType): AppThunk => async (dispatch) => {
    try {
        dispatch(startCircular())
        let res = await profileApi.updateUserInfo(data)
        dispatch(setUserNameEmailAC(res.data.updatedUser))
    } catch (e: any) {
        handleError(e, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}
export const getUserInfoTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(startCircular())
        let res = await profileApi.getUserInfo()
        dispatch(setIsLoggedAC(true))
        dispatch(setUserNameEmailAC(res.data))
    } catch (e: any) {
        handleErrorAuth(e, dispatch)
        setIsLoggedAC(false)
    } finally {
        dispatch(stopCircular())
    }
}

type SetUserNameEmailType = ReturnType<typeof setUserNameEmailAC>
type SetIsLoggedType = ReturnType<typeof setIsLoggedAC>

export type ProfileActionsType = SetUserNameEmailType | SetIsLoggedType

