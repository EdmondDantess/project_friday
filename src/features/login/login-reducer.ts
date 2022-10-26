import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {loginApi} from '../../api/api';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {setIsLoggedAC, setUserEmailAC, setUserNameAC} from '../profile/profile-reducer';

export type stateType = {};
export type LoginActionsTypes = any;

const initialState: stateType = {};

const loginReducer = (state = initialState, action: LoginActionsTypes): stateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}

export default loginReducer;

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