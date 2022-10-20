import {newPasswordReducer, reloadSendEmailPage, startNewPassRedirect} from "./newPassword-reducer";


test("Correct property of 'haveToRedir' should be true", () => {

    const initialState = {
        haveToRedir: false,
    }

    const finalState = newPasswordReducer(initialState, startNewPassRedirect())
    expect(finalState.haveToRedir).toBeTruthy()
})

test("Correct property of 'haveToRedir' should be fasle", () => {

    const initialState = {
        haveToRedir: true,
    }

    const finalState = newPasswordReducer(initialState, reloadSendEmailPage())
    expect(finalState.haveToRedir).toBeFalsy()
})
