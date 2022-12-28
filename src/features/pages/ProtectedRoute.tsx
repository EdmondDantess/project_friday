import { Navigate, Outlet } from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {PATH} from "./Pages";

export const ProtectedRoute = ({
                                   forAuth = true,
                                   redirectTo = PATH.LOGIN,
                               }: PropsType) => {
    const isLogged = useAppSelector(state => state.profile.isLogged);

    return forAuth === isLogged ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

type PropsType = {
    forAuth?: boolean;
    redirectTo?: string;
};