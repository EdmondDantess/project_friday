import React, {useEffect} from 'react';
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import module from './Profile.module.css'
import {AppDispatch, AppRootStateType} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getUserInfoTC, logoutTC, updateUserInfoTC} from './profile-reducer';

const Profile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const email = useSelector<AppRootStateType, string>(state => state.profile.email)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.profile.isLogged)
    const navigate = useNavigate()

    const logout = () => {
        dispatch(logoutTC())
    }
    const updateInfo = (name: string) => {
        dispatch(updateUserInfoTC({name, avatar: ''}))
    }

    useEffect(() => {
        if (!isLogged) {
          return   navigate('/login')
        }
        dispatch(getUserInfoTC())
    }, [isLogged, name, email])

    return (
        <div className={module.parentProfile}>
            <h2>Personal information</h2>
            <div className={module.avatar}>
                <img src="https://bit.ly/3CKLqoF" alt="Avatar"/>
                <button>Change</button>
            </div>
            <SuperEditableSpan value={name} s={updateInfo}/>
            <div>{email}</div>
            <SuperButton onClick={logout}>Logout</SuperButton>
        </div>
    );
};

export default Profile;