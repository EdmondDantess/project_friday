import {newPasswordReducer, startNewPassRedirect} from "./newPassword-reducer";


test("gbisdfs", () => {

    const initialState = {
        haveToRedir: false,
    }

    const finalState = newPasswordReducer(initialState, startNewPassRedirect())
    expect(initialState.haveToRedir).toBe(!finalState.haveToRedir)
})
