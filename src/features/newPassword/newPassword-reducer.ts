import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/restorePasswordApi";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";


const initialState = {
    haveToRedir: false,
}


type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: FinalnewPasswordActionTypes): InitialStateType => {
    switch (action.type) {
        case "NEWPASS/START_REDIRECT":
            return {...state, haveToRedir: true}
        case "NEWPASS/RELOAD_NEWPASS_PAGE":
            return {...state, haveToRedir: false}
        default:
            return state;
    }
}

export const sendNewPassword = (password: string, token: string): AppThunk => async (dispatch) => {
    try {
        dispatch(startCircular())
        const res = await forgotPasswordAPI.newPassword(password, token)
        dispatch(startNewPassRedirect())
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
    } finally {
        dispatch(stopCircular())
    }
}

export const startNewPassRedirect = () =>
    ({type: "NEWPASS/START_REDIRECT", payload: {}} as const)

export const reloadSendEmailPage = () =>
    ({type: "NEWPASS/RELOAD_NEWPASS_PAGE", payload: {}} as const)


export type FinalnewPasswordActionTypes =
    ReturnType<typeof startNewPassRedirect> |
    ReturnType<typeof reloadSendEmailPage>

