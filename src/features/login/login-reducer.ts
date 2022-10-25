import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {setIsLoggedAC, setUserNameEmailAC,} from '../profile/profile-reducer';
import {userAuthAPI} from "../../api/userAuthAPI";

export type StateType = {}

const initialState: StateType = {};

export const loginReducer = (state = initialState, action: FinalLoginActionsTypes): StateType => {
    switch (action.type) {

        case 'LOGIN/SET_USER_ID': {
            return {
                ...state, userId: action.id
            }
        }

        default: {
            return state
        }
    }
}


export const loginAC = (id: number) => ({
    type: 'LOGIN/SET_USER_ID' as const,
    id
})

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        userAuthAPI.login(email, password, rememberMe)
            .then((res) => {
                dispatch(setIsLoggedAC(true))
                dispatch(setUserNameEmailAC(res.data))
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(stopCircular())
            })
    }
}

export type FinalLoginActionsTypes =
    ReturnType<typeof loginAC>
