import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/restorePasswordApi";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";

const initialState = {
    email: null as null | string,
    isSend: false,
}

type InitialStateType = typeof initialState

export const restorePasswordReducer = (state: InitialStateType = initialState, action: FinalRestorePasswordActionsTypes): InitialStateType => {
    switch (action.type) {
        case "RESTPASS/TOGGLE_SEND":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const restorePassword = (email: string): AppThunk<Promise<boolean>> => async (dispatch) => {
    try {
        dispatch(startCircular())
        await forgotPasswordAPI.restorePassword(email)
        dispatch(toggleSend(email, true))
        return true
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
        return false
    } finally {
        dispatch(stopCircular())
    }
}

export const toggleSend = (email: string | null, isSend: boolean) =>
    ({type: "RESTPASS/TOGGLE_SEND", payload: {email, isSend}} as const)

export type FinalRestorePasswordActionsTypes =
    ReturnType<typeof toggleSend>

