import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";

export const ProtectedRoute = ({
                                   forAuth,
                                   redirectTo,
                               }: PropsType) => {
    const isLogged = useAppSelector(state => state.profile.isLogged);

    return forAuth === isLogged ? <Outlet/> : <Navigate to={redirectTo} replace/>;
};

type PropsType = {
    forAuth: boolean;
    redirectTo: string;
};