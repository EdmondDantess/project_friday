import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {loginApi, registerApi} from "../../api/api";
import {AppThunk} from "../../app/store";
import {startCircular} from "../userFeedback/userFeedback-reducer";
import {handleError} from "../../common/utils/error-utils";

// export type loginActionsType = ReturnType<typeof setStatus> | ReturnType<typeof setUserIdAC> | ReturnType<typeof setError>

export type stateType = {}

const initialState: stateType = {};

const registerReducer = (state = initialState, action: any): stateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}

export default registerReducer;


export const register = (email: string, password: string): AppThunk => {
    return (dispatch: Dispatch) => {
        dispatch(startCircular())
        registerApi(email, password)
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

