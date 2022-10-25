import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/restorePasswordApi";
import {startCircular, stopCircular} from "../userFeedback/userFeedback-reducer";
import {AxiosError} from "axios";
import {handleError} from "../../common/utils/error-utils";


const initialState = {
    isSend: false
}

type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: FinalnewPasswordActionTypes): InitialStateType => {
    switch (action.type) {
        case "NEWPASS/TOGGLE_SEND":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const sendNewPassword = (password: string, token: string): AppThunk<Promise<boolean>> => async (dispatch) => {
    try {
        dispatch(startCircular())
        await forgotPasswordAPI.newPassword(password, token)
        dispatch(toggleNewPassRedirect(true))
        return true
    } catch (error: AxiosError & any) {
        handleError(error, dispatch)
        return false
    } finally {
        dispatch(stopCircular())
    }
}

export const toggleNewPassRedirect = (isSend: boolean) =>
    ({type: "NEWPASS/TOGGLE_SEND", payload: {isSend}} as const)


export type FinalnewPasswordActionTypes =
    ReturnType<typeof toggleNewPassRedirect>

