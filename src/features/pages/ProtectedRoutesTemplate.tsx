import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {Profile} from "../profile/Profile";
import React from "react";
import {Login} from "../authorization/login/Login";
import {Registration} from "../authorization/registration/Registration";
import {NewPassword} from "../authorization/newPassword/NewPassword";
import {RestorePassword} from "../authorization/restorePassword/RestorePassword";
import {PacksList} from "../packs/packsList/PacksList";
import {MyPack} from "../packs/myPack/MyPack";
import {LearnPack} from "../packs/learnPack/LearnPack";
import {Error404} from "../erorr404/Error404";

export enum PATH {
    LOGIN = "/login",
    REGISTRATION = "/registration",
    PROFILE = "/profile",
    RESTOREPASS = "/restorepass",
    NEWPASS = "/newpass/:token",
    PACKSLIST = "/packslist/",
    MYPACK = "/mypack",
    FRIENDSPACK = "/friends-pack",
    LEARNPACK = "/learnpack"
}

export const ProtectedRoutesTemplate = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Profile/>}/>
            <Route
                element={<ProtectedRoute forAuth={false} redirectTo={PATH.PROFILE}/>}
            >
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.RESTOREPASS} element={<RestorePassword/>}/>
                <Route path={`${PATH.NEWPASS}/:resetPasswordToken`} element={<NewPassword/>}
                />
            </Route>

            <Route
                element={<ProtectedRoute forAuth={true} redirectTo={PATH.LOGIN}/>}
            >
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PACKSLIST} element={<PacksList/>}/>
                <Route path={PATH.MYPACK} element={<MyPack/>}/>
                <Route path={PATH.LEARNPACK} element={<LearnPack/>}/>
            </Route>

            <Route path={"/*"} element={<Error404/>}/>
        </Routes>
    );
};

//  <Route element={<BaseLayout center widthConstraint breadcrumbs />}>
//     <Route path={PATHS.profile} element={<ProfilePage />} />
//  </Route>