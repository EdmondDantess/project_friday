import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    FinalRestorePasswordActionsTypes,
    restorePasswordReducer
} from "../features/restorePassword/restorePassword-reducer";
import {
    FinalnewPasswordActionTypes,
    newPasswordReducer,
} from "../features/newPassword/newPassword-reducer";
import {ProfileActionsType, profileReducer} from "../features/profile/profile-reducer";
import loginReducer, {FinalLoginActionsTypes} from "../features/login/login-reducer";
import registerReducer from "../features/registration/register-reducer";
import {FinalUserFeedbackActionTypes, userFeedback} from "../features/userFeedback/userFeedback-reducer";

const rootReducer = combineReducers({
    restorePass: restorePasswordReducer,
    newPass: newPasswordReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registerReducer,
    userFeedback: userFeedback,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    FinalRestorePasswordActionsTypes
    | FinalnewPasswordActionTypes
    | ProfileActionsType
    | FinalLoginActionsTypes
    | FinalUserFeedbackActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store;

