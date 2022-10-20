import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {loginApi} from '../../api/api';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {setIsLoggedAC, setUserEmailAC, setUserNameAC} from '../profile/profile-reducer';

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {}

const initialState: stateType = {};

const loginReducer = (state = initialState, action: FinalLoginActionsTypes): stateType => {
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

export default loginReducer;

export const loginAC = (id: number) => ({
    type: 'LOGIN/SET_USER_ID' as const,
    id
})

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        loginApi(email, password, rememberMe)
            .then((res) => {
                dispatch(setIsLoggedAC(true))
                dispatch(setUserNameAC(res.data.name))
                dispatch(setUserEmailAC(res.data.email))
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
