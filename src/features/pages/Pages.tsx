import {RestorePassword} from '../authorization/restorePassword/RestorePassword';
import {Registration} from '../authorization/registration/Registration';
import {NewPassword} from '../authorization/newPassword/NewPassword';
import {Navigate, Route, Routes} from 'react-router-dom';
import {LearnPack} from '../packs/learnPack/LearnPack';
import {PacksList} from '../packs/packsList/PacksList';
import {Login} from '../authorization/login/Login';
import {Error404} from '../erorr404/Error404';
import {MyPack} from '../packs/myPack/MyPack';
import {Profile} from '../profile/Profile';
import React from 'react';

export enum PATH {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    RESTOREPASS = '/restorepass',
    NEWPASS = '/newpass/:token',
    PROFILE = '/profile',
    PACKSLIST = '/packslist/',
    MYPACK = '/mypack',
    LEARNPACK = '/learnpack'
}

export const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.RESTOREPASS} element={<RestorePassword/>}/>
            <Route path={PATH.NEWPASS} element={<NewPassword/>}/>
            <Route path={PATH.PACKSLIST} element={<PacksList/>}/>
            <Route path={PATH.MYPACK} element={<MyPack/>}/>
            <Route path={PATH.LEARNPACK} element={<LearnPack/>}/>
            <Route path={'/*'} element={<Error404/>}/>
        </Routes>
    );
};