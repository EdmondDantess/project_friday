import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {
    FinalRestorePasswordActionsTypes,
    restorePasswordReducer
} from '../features/authorization/restorePassword/restorePassword-reducer';
import {
    FinalnewPasswordActionTypes,
    newPasswordReducer,
} from '../features/authorization/newPassword/newPassword-reducer';
import {ProfileActionsType, profileReducer} from '../features/profile/profile-reducer';
import {LoginActionsTypes, loginReducer} from '../features/authorization/login/login-reducer';
import {FinalUserFeedbackActionTypes, userFeedback} from '../features/userFeedback/userFeedback-reducer';
import {registerReducer, RegistrTypeActions} from '../features/authorization/registration/register-reducer';
import {FinalPacksListActionTypes, packsListReducer} from '../features/packs/packsList/packsList-reducer';
import {MyPackActionsType, mypackReducer} from '../features/packs/myPack/mypack-reducer';
import friendsPackReducer from '../features/packs/FriendsPack/reducer';
import {LearnPackActionsType, learnPackReducer} from '../features/packs/learnPack/learnPack-reducer';

const rootReducer = combineReducers({
    restorePass: restorePasswordReducer,
    newPass: newPasswordReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registerReducer,
    userFeedback: userFeedback,
    friendsPack: friendsPackReducer,
    packs: packsListReducer,
    myPack: mypackReducer,
    learnPack: learnPackReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    FinalRestorePasswordActionsTypes
    | FinalnewPasswordActionTypes
    | ProfileActionsType
    | LoginActionsTypes
    | FinalUserFeedbackActionTypes
    | RegistrTypeActions
    | FinalPacksListActionTypes
    | MyPackActionsType
    | LearnPackActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store;