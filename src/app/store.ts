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
import {FinalLoginActionsTypes, loginReducer} from "../features/login/login-reducer";
import {FinalUserFeedbackActionTypes, userFeedback} from "../features/userFeedback/userFeedback-reducer";
import {registerReducer, RegistrTypeActions} from "../features/registration/register-reducer";
import {FinalPacksListActionTypes, packsListReducer} from "../features/packsList/packsList-reducer";
import {MyPackActionsType, mypackReducer} from '../features/packs/myPack/mypack-reducer';

const rootReducer = combineReducers({
    restorePass: restorePasswordReducer,
    newPass: newPasswordReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registerReducer,
    userFeedback: userFeedback,
    packs: packsListReducer,
    myPack: mypackReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    FinalRestorePasswordActionsTypes
    | FinalnewPasswordActionTypes
    | ProfileActionsType
    | FinalLoginActionsTypes
    | FinalUserFeedbackActionTypes
    | RegistrTypeActions
    | FinalPacksListActionTypes
    | MyPackActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store;

