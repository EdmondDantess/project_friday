import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getUserInfoTC, logoutTC, updateUserInfoTC} from './profile-reducer';
import {Avatar, Button, IconButton, TextField} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {PhotoCamera} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import style from './Profile.module.scss'
import {PATH} from '../pages/Pages';

const Profile = () => {
    const dispatch = useAppDispatch()
    const name = useAppSelector<string>(state => state.profile.name)
    const email = useAppSelector<string>(state => state.profile.email)
    const avatar = useAppSelector<string>(state => state.profile.avatar)
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [stateTextfield, setStateTextfield] = useState<string>(name);

    const editTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStateTextfield(e.currentTarget.value)
    }
    const editModeToggle = () => {
        setEditMode(!editMode)
    }
    const logout = () => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN)
    }
    const updateInfo = (name: string) => {
        dispatch(updateUserInfoTC({name, avatar: ''}))
    }
    const sendUpdateInfo = (name: string) => {
        if (name.trim().length === 0 || name.trim().length > 30) {
            return alert('Please enter correct you Name')
        } else {
            updateInfo(name)
            editModeToggle()
        }
    }

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
    }, [isLogged])

    useEffect(() => {
        setStateTextfield(name)
    }, [name])

    return (
        <div className={style.parentProfile}>
            <h2 style={{marginTop: '-20px'}}>Personal information</h2>
            <div className={style.avatar}>
                <Avatar alt={name} src={avatar}
                        sx={{width: 96, height: 96}}/>
                <IconButton color="default" aria-label="upload picture" component="label" style={{
                    margin: '-50px 50px 0px'
                }}>
                    <input hidden accept="image/*" type="file"/>
                    <PhotoCamera/>
                </IconButton>
            </div>
            {
                !editMode ?
                    <span onDoubleClick={editModeToggle} style={{fontSize: '20px', fontWeight: '600'}}>
                        {name}
                        <IconButton
                            onClick={editModeToggle}
                            color="default" style={{
                            marginTop: '-10px',
                        }}>
                        <BorderColorOutlinedIcon/>
                        </IconButton></span>
                    : <>
                        <TextField InputProps={{
                            endAdornment: <Button variant="contained" size={'medium'}
                                                  className={style.SaveButTextField}
                                                  onClick={() => sendUpdateInfo(stateTextfield)}
                            >save</Button>
                        }}
                                   onBlur={() => sendUpdateInfo(stateTextfield)}
                                   onChange={editTextField} value={stateTextfield}
                                   id="standard-basic" label="Nickname"
                                   variant="standard" autoFocus
                        />
                    </>
            }
            <div className={style.emailProfile}>{email}</div>
            <Button onClick={logout} variant="outlined"
                    style={{
                        marginTop: '29px',
                        color: 'black',
                        border: '1px grey none',
                        borderRadius: '90px',
                        boxShadow: '0px 2px 10px grey'
                    }}
            ><LogoutRoundedIcon/>Logout</Button>
        </div>
    )
}

export default Profile