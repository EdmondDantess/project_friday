import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Profile from './Profile/Profile';
import RestorePassword from './RestorePassword/RestorePassword';
import NewPassword from './NewPassword/NewPassword';
import SuperComponents from './SuperComponentsTEST/SuperComponents';
import Error404 from './Erorr404/Error404';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTOREPASS: '/restorepass',
    NEWPASS: '/newpass',
    TESTSUPERCOMPONENTS: '/supercomponents',
};

const Pages = () => {
    return (
        <div>
            <Routes>
                {/*<Route path={"/"} element={<Navigate to={PATH.PROFILE} />} />*/}
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.RESTOREPASS} element={<RestorePassword/>}/>
                <Route path={PATH.NEWPASS} element={<NewPassword/>}/>
                <Route path={PATH.TESTSUPERCOMPONENTS} element={<SuperComponents/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;