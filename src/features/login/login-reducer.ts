import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {loginApi} from '../../api/api';
import {reloadSendEmailPage, showSuccessSend} from '../restorePassword/restorePassword-reducer';
import {AppThunk} from '../../app/store';
import {getUserInfoTC, setIsLoggedAC} from '../profile/profile-reducer';

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

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    loginApi(email, password, rememberMe).then((res) => {
     //   console.log(res)
        dispatch(setIsLoggedAC(true))
    }).catch((error: AxiosError) => {
        console.log(error)
    })
}


export type FinalLoginActionsTypes =
    ReturnType<typeof loginAC>
