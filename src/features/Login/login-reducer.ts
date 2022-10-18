import {Dispatch} from 'redux';
import {AppThunkType} from '../../redux/store';
import {AxiosError} from 'axios';
import { loginApi } from '../../api/api';

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {
    
}

const initialState: stateType =  {
    userId: null,
    error: null
};

const loginReducer = (state = initialState, action: any): stateType  => {
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

export default loginReducer;

export const loginAC = (id: number) => ({
    type: 'LOGIN/SET_USER_ID' as const,
    id
})

export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => {
    return async (dispatch: Dispatch) => {
        loginApi(email, password, rememberMe).then((res) => {
            console.log(res)
        }).catch((error: AxiosError) => {
            console.log(error)
        })
    }
}