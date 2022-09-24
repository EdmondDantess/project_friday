import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages';
import './PageNavigation.css'

const PageNavigation = () => {
    return (
        <div>
            <ul className="listNav">
                <NavLink to={PATH.PROFILE}>
                    <li>PROFILE</li>
                </NavLink>
                <NavLink to={PATH.LOGIN}>
                    <li>LOGIN</li>
                </NavLink>
                <NavLink to={PATH.REGISTRATION}>
                    <li>REGISTRATION</li>
                </NavLink>
                <NavLink to={PATH.RESTOREPASS}>
                    <li>RESTOREPASS</li>
                </NavLink>
                <NavLink to={PATH.NEWPASS}>
                    <li>NEWPASSWORD</li>
                </NavLink>
                <NavLink to={PATH.TESTSUPERCOMPONENTS}>
                    <li>TESTSUPERCOMPONENTS</li>
                </NavLink>
                <NavLink to={"/*"}>
                    <li>Test Error404</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default PageNavigation;