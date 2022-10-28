import {newPasswordReducer, toggleNewPassRedirect,} from "./newPassword-reducer";


test("Correct property of 'isSend' should be true", () => {

    const initialState = {
        isSend: false,
    }

    const finalState = newPasswordReducer(initialState, toggleNewPassRedirect(true))
    expect(finalState.isSend).toBeTruthy()
})

