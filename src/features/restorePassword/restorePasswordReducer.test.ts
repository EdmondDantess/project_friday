import {restorePasswordReducer, toggleSend} from "./restorePassword-reducer";


test("Correct property of 'email' should be changed", () => {

    const initialState = {
        isSend: false,
        email: "",
    }

    const finalState = restorePasswordReducer(initialState, toggleSend("123", true))
    expect(finalState.email).toBe("123")
    expect(finalState.isSend).toBeTruthy()
})
