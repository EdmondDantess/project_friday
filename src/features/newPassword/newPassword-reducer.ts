import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/api-restorePassword";


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

export const sendNewPassword = (password: string, token: string): AppThunk => (dispatch) => {
    forgotPasswordAPI.newPassword(password, token)
        .then(res => {
                console.log(res)
                dispatch(startNewPassRedirect())
            }
        )
        .catch(error => {
            console.log(error)
            console.log("error occurred")
        })
}

export const startNewPassRedirect = () =>
    ({type: "NEWPASS/START_REDIRECT", payload: {}} as const)

export const reloadSendEmailPage = () =>
    ({type: "NEWPASS/RELOAD_NEWPASS_PAGE", payload: {}} as const)


export type FinalnewPasswordActionTypes =
    ReturnType<typeof startNewPassRedirect> |
    ReturnType<typeof reloadSendEmailPage>

