import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {logoutTC, updateUserInfoTC} from './profile-reducer';
import {Avatar, Button, IconButton, Paper, TextField} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {PhotoCamera} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import style from './profile.module.scss'
import {PATH} from '../pages/Pages';
import {setError} from '../userFeedback/userFeedback-reducer';
import {InputTypeFile} from '../../common/components/uploadFile/UploadFile';

const buttonLogOut = {
    marginTop: '10px',
    color: 'black',
    border: '1px grey none',
    borderRadius: '80px',
    boxShadow: '0px 2px 10px grey',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
        border: '0px none none',
    },
}

const buttonGoToPackList = {
    width: '200px',
    marginTop: '10px',
    color: 'white',
    border: '1px grey none',
    borderRadius: '40px',
    boxShadow: '0px 2px 10px grey'
}

export const Profile = () => {

    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const avatar = useAppSelector(state => state.profile.avatar)
    const error = useAppSelector(state => state.userFeedback.error)
    const isLogged = useAppSelector(state => state.profile.isLogged)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [stateTextfield, setStateTextfield] = useState<string>(name);

    useEffect(() => {
        if (!isLogged) {
            return navigate(PATH.LOGIN)
        }
        setStateTextfield(name)
    }, [navigate, isLogged, name, avatar])

    const editTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStateTextfield(e.currentTarget.value)
    }
    const sendUpdateInfo = (name: string) => {
        if (name.trim().length === 0 || name.trim().length > 30) {
            return dispatch(setError('Please enter correct you Name'))
        } else {
            updateInfo(name)
            editModeToggle()
        }
    }
    const updateInfo = (name: string) => {
        dispatch(updateUserInfoTC({name, avatar: ''}))
    }
    const editModeToggle = () => {
        setEditMode(!editMode)
    }
    const logout = () => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN)
    }

    return (
        <Paper className={style.parentProfile}>
            <h2 style={{marginTop: '-20px'}}>Personal information</h2>
            <div className={style.avatar}>
                <Avatar alt={name !== '' ? name : 'fail'}
                        src={avatar ? avatar : 'https://bit.ly/3CKLqoF'}
                        sx={{width: 96, height: 96}}/>
                <InputTypeFile profile={'profile'}>
                    <IconButton color="inherit" aria-label="upload picture" component="span" sx={{
                        margin: '-50px 50px 0px'
                    }}>
                        <PhotoCamera sx={{border: '1px solid white', borderRadius: '50%'}}/>
                    </IconButton>
                </InputTypeFile>
            </div>
            {
                !editMode ?
                    <span onDoubleClick={editModeToggle} style={{fontSize: '20px', fontWeight: '600'}}>
                        {name}
                        <IconButton
                            onClick={editModeToggle}
                            color="default" style={{marginTop: '-10px'}}>
                        <BorderColorOutlinedIcon/>
                        </IconButton></span>
                    : <>
                        <TextField error={!!error}
                                   InputProps={{
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
            <Button variant={'contained'} onClick={() => navigate(PATH.PACKSLIST)}
                    sx={buttonGoToPackList}
            >Go to learn</Button>
            <Button onClick={logout} variant="contained"
                    sx={buttonLogOut}
            ><LogoutRoundedIcon/>Logout</Button>
        </Paper>
    )
}