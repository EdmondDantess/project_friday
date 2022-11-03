import {AppThunk} from '../../app/store';
import {startCircular, stopCircular, toggleIsLoaded} from '../userFeedback/userFeedback-reducer';
import {handleError, handleErrorAuth} from '../../common/utils/error-utils';
import {UpdateUserInfoType, userAuthAPI} from '../../api/userAuthAPI';
import {setCurrentUserId} from '../packs/packsList/packsList-reducer';

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
            return {...state, name: action.payload.name, email: action.payload.email}
        case 'profile/SET-ISLOGGED':
            return {...state, isLogged: action.payload.value}
        default:
            return state
    }
}

export const setUserNameEmailAC = (usInfo: { name: string, email: string }) => {
    return {
        type: 'profile/SET-USERNAMEEMAIL',
        payload: {
            name: usInfo.name,
            email: usInfo.email
        }
    } as const
}

export const setIsLoggedAC = (value: boolean) => {
    return {
        type: 'profile/SET-ISLOGGED',
        payload: {value}
    } as const
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(startCircular())
        await userAuthAPI.logout()
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
        let res = await userAuthAPI.updateUserInfo(data)
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
        let res = await userAuthAPI.getUserInfo()
        dispatch(setCurrentUserId(res.data._id))
        dispatch(setIsLoggedAC(true))
        dispatch(setUserNameEmailAC(res.data))
    } catch (e: any) {
        handleErrorAuth(e, dispatch)

    } finally {
        dispatch(stopCircular())
        dispatch(toggleIsLoaded(true))
    }
}

export type ProfileActionsType =
    ReturnType<typeof setUserNameEmailAC> |
    ReturnType<typeof setIsLoggedAC>