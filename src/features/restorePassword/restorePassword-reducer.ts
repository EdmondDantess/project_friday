import {AppThunk} from "../../app/store";
import {forgotPasswordAPI} from "../../api/api-restorePassword";


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

export const restorePassword = (email: string): AppThunk => (dispatch) => {
    forgotPasswordAPI.restorePassword(email)
        .then(res => {
                console.log(res)
                console.log("success")
            }
        )
        .catch(error => {
            console.log(error)
            console.log("error occurred")
        })
        .finally(() => {
            dispatch(showSuccessSend(email))
        })
}

// export const registerMe = (): AppThunk => (dispatch) => {
//     // dispatch()
//     forgotPasswordAPI.registerMe()
//         .then(res => {
//                 console.log(res)
//                 console.log("success")
//             }
//         )
//         .catch(error => {
//             console.log(error)
//             console.log("error occurred")
//         })
// }


export const showSuccessSend = (email: string) =>
    ({type: "RESTPASS/SHOW_SUCCESS_SEND", payload: {email}} as const)

export const reloadSendEmailPage = () =>
    ({type: "RESTPASS/RELOAD_SEND_PAGE", payload: {}} as const)

export type FinalRestorePasswordActionsTypes =
    ReturnType<typeof showSuccessSend> |
    ReturnType<typeof reloadSendEmailPage>

