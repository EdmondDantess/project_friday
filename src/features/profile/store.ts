import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    profile: profileReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>

export type ActionsType = ProfileActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>

//@ts-ignore
window.store = store