import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {NewPassword} from '../authorization/newPassword/NewPassword';
import {Error404} from '../erorr404/Error404';
import {Registration} from '../authorization/registration/Registration';
import {Login} from '../authorization/login/Login';
import {RestorePassword} from '../authorization/restorePassword/RestorePassword';
import {Profile} from '../profile/Profile';
import {PacksList} from '../packs/packsList/PacksList';
import {MyPack} from '../packs/myPack/MyPack';
import FriendsPack from '../packs/FriendsPack/FriendsPack';
import {LearnPack} from '../packs/learnPack/LearnPack';

export enum PATH {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    RESTOREPASS = '/restorepass',
    NEWPASS = '/newpass/:token',
    PACKSLIST = '/packslist',
    MYPACK = '/mypack',
    FRIENDSPACK = '/friends-pack',
    LEARNPACK = '/learnpack',
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
            <Route path={PATH.FRIENDSPACK} element={<FriendsPack/>}/>
            <Route path={PATH.LEARNPACK} element={<LearnPack/>}/>
            <Route path={'/*'} element={<Error404/>}/>
        </Routes>
    );
};