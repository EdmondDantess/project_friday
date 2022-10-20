import {reloadSendEmailPage, restorePasswordReducer, showSuccessSend} from "./restorePassword-reducer";


test("Correct property of 'email' should be changed", () => {

    const initialState = {
        isSent: false,
        email: "",
    }

    const finalState = restorePasswordReducer(initialState, showSuccessSend("123"))
    expect(finalState.email).toBe("123")
})

test("Correct property of 'isSent' and 'email' should be changed", () => {

    const initialState = {
        isSent: true,
        email: "ewqeqwe",
    }

    const finalState = restorePasswordReducer(initialState, reloadSendEmailPage())
    expect(finalState.isSent).toBeFalsy()
    expect(finalState.email).toBe("")
})
