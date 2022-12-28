import {PaletteMode} from "@mui/material";

const paletteMode =
    localStorage.getItem("paletteMode") === "dark" ? "dark" : "light";

const initialState = {
    circularEntity: false,
    error: null as UserFeedBackErrorType,
    isLoaded: false,
    paletteMode: paletteMode as PaletteMode,
}

export const userFeedback = (state: InitialStateType = initialState, action: FinalUserFeedbackActionTypes): InitialStateType => {
    switch (action.type) {
        case "USERFEEDBACK/START_CIRCULAR":
            return {...state, circularEntity: true}
        case "USERFEEDBACK/STOP_CIRCULAR":
            return {...state, circularEntity: false}
        case "USERFEEDBACK/SET_ERROR":
            return {...state, error: action.payload.error}
        case "USERFEEDBACK/TOGGLE_IS_LOADED":
        case "USERFEEDBACK/SET_PALETTE_MOD":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const toggleIsLoaded = (isLoaded: boolean) =>
    ({type: "USERFEEDBACK/TOGGLE_IS_LOADED", payload: {isLoaded}} as const)

export const startCircular = () =>
    ({type: "USERFEEDBACK/START_CIRCULAR", payload: {}} as const)

export const stopCircular = () =>
    ({type: "USERFEEDBACK/STOP_CIRCULAR", payload: {}} as const)

export const setError = (error: UserFeedBackErrorType) =>
    ({type: "USERFEEDBACK/SET_ERROR", payload: {error}} as const)

export const changePaletteMod = (paletteMode: PaletteType) =>
    ({type: "USERFEEDBACK/SET_PALETTE_MOD", payload: {paletteMode}} as const)

type PaletteType = "dark" | "light"

export type UserFeedBackErrorType = string | null
type InitialStateType = typeof initialState

export type FinalUserFeedbackActionTypes =
    ReturnType<typeof startCircular> |
    ReturnType<typeof stopCircular> |
    ReturnType<typeof toggleIsLoaded> |
    ReturnType<typeof changePaletteMod> |
    ReturnType<typeof setError>

