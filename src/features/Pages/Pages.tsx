import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NewPassword from "../newPassword/NewPassword";
import Error404 from "../../features/Erorr404/Error404";
import Registration from "../../features/Registration/Registration";
import SuperComponents from "../../features/SuperComponentsTEST/SuperComponents";
import Login from "../../features/Login/Login";
import RestorePassword from "../restorePassword/RestorePassword";
import Profile from "../../features/Profile/Profile";


export const PATH = {
    LOGIN: "/login",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    RESTOREPASS: "/restorepass",
    NEWPASS: "/newpass/:token",
    TESTSUPERCOMPONENTS: "/supercomponents",
};

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.RESTOREPASS} element={<RestorePassword/>}/>
                <Route path={PATH.NEWPASS} element={<NewPassword/>}/>
                <Route path={PATH.TESTSUPERCOMPONENTS} element={<SuperComponents/>}/>
                <Route path={"/*"} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;