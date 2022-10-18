import {legacy_createStore as createStore, combineReducers, applyMiddleware, AnyAction} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import loginReducer from '../features/Login/login-reducer';


// Объединим редьюсеры
const rootReducer = combineReducers({
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type rootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<rootReducerType>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>

// 1 — Что возвращает thunk
// 2 — Тип стейта всего приложения
// 3 — Экстра–аргументы
// 4 — Типы всех actions
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>