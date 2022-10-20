import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/restorePasswordApi";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";


const initialState = {
    isSent: false,
    email: "",
}

type InitialStateType = typeof initialState

export const restorePasswordReducer = (state: InitialStateType = initialState, action: FinalRestorePasswordActionsTypes): InitialStateType => {
    switch (action.type) {
        case "RESTPASS/SHOW_SUCCESS_SEND":
            return {...state, isSent: true, email: action.payload.email}
        case "RESTPASS/RELOAD_SEND_PAGE":
            return {...state, isSent: false, email: ""}
        default:
            return state;
    }
}

export const restorePassword = (email: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startCircular())
        let res = await forgotPasswordAPI.restorePassword(email)
        dispatch(showSuccessSend(email))
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}


export const showSuccessSend = (email: string) =>
    ({type: "RESTPASS/SHOW_SUCCESS_SEND", payload: {email}} as const)

export const reloadSendEmailPage = () =>
    ({type: "RESTPASS/RELOAD_SEND_PAGE", payload: {}} as const)

export type FinalRestorePasswordActionsTypes =
    ReturnType<typeof showSuccessSend> |
    ReturnType<typeof reloadSendEmailPage>

