import {setError, startCircular, stopCircular, userFeedback, UserFeedBackErrorType} from "./userFeedback-reducer";
import {PaletteMode} from "@mui/material";

let initialState = {
    circularEntity: false,
    error: null as UserFeedBackErrorType,
    isLoaded: true,
    paletteMode: "light" as PaletteMode
}

beforeEach( () => {
    initialState = {
        circularEntity: false,
        error: null as UserFeedBackErrorType,
        isLoaded: true,
        paletteMode: "light" as PaletteMode
    }
});

test("Correct property of 'circularEntity' should be true", () => {
    const finalState = userFeedback(initialState, startCircular())
    expect(finalState.circularEntity).toBeTruthy()
})

test("Correct property of 'circularEntity' should be false", () => {
    const finalState = userFeedback(initialState, stopCircular())
    expect(finalState.circularEntity).toBeFalsy()
})

test("Correct property of 'setError' should be changed", () => {
    const error = "some error"

    const finalState = userFeedback(initialState, setError(error))
    expect(finalState.circularEntity).toBeFalsy()
    expect(finalState.error).toBe(error)
})