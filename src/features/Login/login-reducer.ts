import {Dispatch} from 'redux';
import {AppThunkType} from '../../redux/store';
import {AxiosError} from 'axios';

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {
    
}

const initialState: stateType = {
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

export const setUserIdAC = (id: number) => ({
    type: 'LOGIN/SET_USER_ID' as const,
    id
})

export const login = (): AppThunkType => {
    return async (dispatch: Dispatch) => {

    }
}