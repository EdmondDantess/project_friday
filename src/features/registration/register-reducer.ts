import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {AppThunk} from '../../app/store';
import {startCircular, stopCircular} from '../userFeedback/userFeedback-reducer';
import {handleError} from '../../common/utils/error-utils';
import {userAuthAPI} from "../../api/userAuthAPI";

export type stateType = typeof initialState

const initialState = {
    isReg: false
};

export const registerReducer = (state = initialState, action: RegistrTypeActions): stateType => {
    switch (action.type) {
        case 'register/SET-REGISTRED':
            return {...state, isReg: true}
        case 'register/SET-REGISTRED-FALSE':
            return {...state, isReg: false}
        default: {
            return state
        }
    }
}



export const isRegistrationAC = () => {
    return {
        type: 'register/SET-REGISTRED',
    } as const
}
export const isRegistrationFalseAC = () => {
    return {
        type: 'register/SET-REGISTRED-FALSE',
    } as const
}

export const register = (email: string, password: string): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        userAuthAPI.register(email, password)
            .then(() => {
                dispatch(isRegistrationAC())
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(stopCircular())
            })
    }
}
export type RegistrTypeActions = ReturnType<typeof isRegistrationAC> | ReturnType<typeof isRegistrationFalseAC>
