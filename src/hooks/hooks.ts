import {useSelector} from "react-redux";
import {TypedUseSelectorHook, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;