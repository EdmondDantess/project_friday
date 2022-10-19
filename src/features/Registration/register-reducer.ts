import {Dispatch} from 'redux';
import {AppThunkType} from '../../redux/store';
import {AxiosError} from 'axios';
import { loginApi, registerApi } from '../../api/api';

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {
    
}

const initialState: stateType =  {
    userId: null,
    error: null
};

const registerReducer = (state = initialState, action: any): stateType  => {
    switch(action.type) {

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

export default registerReducer;


export const register = (email: string, password: string): AppThunkType => {
    return async (dispatch: Dispatch) => {
        registerApi(email, password).then((res) => {
            console.log(res)
        }).catch((error: AxiosError) => {
            console.log(error)
        })
    }
}

