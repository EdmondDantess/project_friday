import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {loginApi} from "../../api/api";
import {reloadSendEmailPage, showSuccessSend} from "../restorePassword/restorePassword-reducer";
import {AppThunk} from "../../app/store";
import {startCircular} from "../userFeedback/userFeedback-reducer";
import {handleError} from "../../common/utils/error-utils";

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {}

const initialState: stateType = {};

const loginReducer = (state = initialState, action: FinalLoginActionsTypes): stateType => {
    switch (action.type) {

        case "LOGIN/SET_USER_ID": {
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
    type: "LOGIN/SET_USER_ID" as const,
    id
})

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        loginApi(email, password, rememberMe)
            .then((res) => {
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(startCircular())
            })
    }
}

export type FinalLoginActionsTypes =
    ReturnType<typeof loginAC>
