import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = { type: "" }
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// @ts-ignore
// window.store = store;

