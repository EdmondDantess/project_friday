import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {registerApi} from "../../api/api";
import {AppThunk} from "../../app/store";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
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
            .then(() => {
            })
            .catch((error: AxiosError) => {
                handleError(error, dispatch)
            })
            .finally(() => {
                dispatch(stopCircular())
            })
    }
}

