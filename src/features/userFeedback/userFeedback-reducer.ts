const initialState = {
    circularEntity: false,
    error: null as UserFeedBackErrorType
}

export const userFeedback = (state: InitialStateType = initialState, action: FinalUserFeedbackActionTypes): InitialStateType => {
    switch (action.type) {
        case "USERFEEDBACK/START_CIRCULAR":
            return {...state, circularEntity: true}
        case "USERFEEDBACK/STOP_CIRCULAR":
            return {...state, circularEntity: false}
        case "USERFEEDBACK/SET_ERROR":
            return {...state, error: action.payload.error}
        default:
            return state;
    }
}

export const startCircular = () =>
    ({type: "USERFEEDBACK/START_CIRCULAR", payload: {}} as const)

export const stopCircular = () =>
    ({type: "USERFEEDBACK/STOP_CIRCULAR", payload: {}} as const)

export const setError = (error: UserFeedBackErrorType) =>
    ({type: "USERFEEDBACK/SET_ERROR", payload: {error}} as const)


type UserFeedBackErrorType = string | null
type InitialStateType = typeof initialState

export type FinalUserFeedbackActionTypes =
    ReturnType<typeof startCircular> |
    ReturnType<typeof stopCircular> |
    ReturnType<typeof setError>
