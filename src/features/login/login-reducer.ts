import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {setIsLoggedAC, setUserNameEmailAC,} from '../profile/profile-reducer';
import {userAuthAPI} from "../../api/userAuthAPI";
import {setUserId} from "../packsList/packsList-reducer";

export type LoginActionsTypes = any;
export type StateType = {}

const initialState: StateType = {};

export const loginReducer = (state = initialState, action: LoginActionsTypes): StateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        userAuthAPI.login(email, password, rememberMe)
            .then((res) => {
                dispatch(setIsLoggedAC(true))
                dispatch(setUserNameEmailAC(res.data))
                dispatch(setUserId(res.data._id))
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(stopCircular())
            })
    }
}