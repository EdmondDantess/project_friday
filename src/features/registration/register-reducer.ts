import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import { loginApi, registerApi } from '../../api/api';
import { AppThunk } from "../../app/store";

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {
    
}

const initialState: stateType =  {
};

const registerReducer = (state = initialState, action: any): stateType  => {
    switch(action.type) {
        default: {
            return state
        }
    }
}

export default registerReducer;


export const register = (email: string, password: string): AppThunk => {
    return async (dispatch: Dispatch) => {
        registerApi(email, password).then((res) => {
            console.log(res)
        }).catch((error: AxiosError) => {
            console.log(error)
        })
    }
}

