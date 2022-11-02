import {setError, startCircular, stopCircular, userFeedback, UserFeedBackErrorType} from "./userFeedback-reducer";

test("Correct property of 'circularEntity' should be true", () => {

    const initialState = {
        circularEntity: false,
        error: null as UserFeedBackErrorType,
        isLoaded: true
    }

    const finalState = userFeedback(initialState, startCircular())
    expect(finalState.circularEntity).toBeTruthy()
})

test("Correct property of 'circularEntity' should be false", () => {

    const initialState = {
        circularEntity: true,
        error: null as UserFeedBackErrorType,
        isLoaded: true
    }

    const finalState = userFeedback(initialState, stopCircular())
    expect(finalState.circularEntity).toBeFalsy()
})

test("Correct property of 'setError' should be changed", () => {

    const initialState = {
        circularEntity: false,
        error: null as UserFeedBackErrorType,
        isLoaded: true
    }

    const error = "some error"

    const finalState = userFeedback(initialState, setError(error))
    expect(finalState.circularEntity).toBeFalsy()
    expect(finalState.error).toBe(error)
})