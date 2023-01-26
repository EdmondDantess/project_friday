import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {logoutTC, updateUserInfoTC} from './profile-reducer';
import {Avatar, Box, Button, IconButton, Paper, styled, TextField} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {PhotoCamera} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {PATH} from '../pages/Pages';
import {setError} from '../userFeedback/userFeedback-reducer';
import {InputTypeFile} from '../../common/components/uploadFile/UploadFile';

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
    const [showFullName, setShowFullName] = useState<boolean>(false);

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
    const generateName = (fullname: boolean) => {
        return fullname && name.length > 14 ? name : name.slice(0, 15).concat('...')
    }

    return (
        <ProfilePaperWrap>
            <h2 style={{marginTop: '-20px'}}>Personal information</h2>
            <AvatarSection>
                <Avatar alt={name !== '' ? name : 'fail'}
                        src={avatar ? avatar : 'https://bit.ly/3CKLqoF'}
                        sx={{width: 96, height: 96}}/>
                <InputTypeFile profile={'profile'}>
                    <IconButton color="inherit" aria-label="upload picture" component="span" sx={{
                        margin: '-50px 50px 0px'
                    }}>
                        <PhotoCamera sx={{borderRadius: '50%'}}/>
                    </IconButton>
                </InputTypeFile>
            </AvatarSection>
            {
                !editMode ?
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <span style={{fontSize: '20px', fontWeight: '600'}}
                              onDoubleClick={editModeToggle}
                              onMouseEnter={() => setShowFullName(true)}
                              onMouseLeave={() => setShowFullName(false)}>
                        {
                            generateName(showFullName)
                        }
                   </span> <IconButton
                        onClick={editModeToggle}
                        color="default" style={{marginTop: '-10px'}}>
                        <BorderColorOutlinedIcon/>
                    </IconButton>
                    </div>
                    : <>
                        <TextField error={!!error}
                                   InputProps={{
                                       endAdornment: <Button variant="contained" size={'medium'}
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
            <EmailSection>{email}</EmailSection>
            <BtnGoPackList variant={'contained'} onClick={() => navigate(PATH.PACKSLIST)}>Go to learn</BtnGoPackList>
            <BtnLogOut onClick={logout} variant="contained"><LogoutRoundedIcon/>Logout</BtnLogOut>
        </ProfilePaperWrap>
    )
}

export const ProfilePaperWrap = styled(Paper)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    width: '400px',
    height: '400px',
    margin: '60px auto',

    backgroundColor: 'var(--bg4)',
}));
export const AvatarSection = styled(Box)(({theme}) => ({
    position: 'relative',
    height: '96px',
    width: '96px',
    margin: '20px auto',

    borderRadius: '50%',
    border: '1px solid darkgrey',

    backgroundColor: 'var(--bg3)',
}));
export const EmailSection = styled(Box)(({theme}) => ({
    marginTop: '10px',

    fontWeight: '400',
    fontSize: '15px',
    lineHeight: '24px',

    opacity: '0.5',
}));
export const BtnLogOut = styled(Button)(({theme}) => ({
    marginTop: '10px',

    border: '1px grey none',
    borderRadius: '80px',

    boxShadow: '0px 2px 10px grey',
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
        border: '0px none none',
    },
}));
export const BtnGoPackList = styled(Button)(({theme}) => ({
    width: '200px',
    marginTop: '10px',

    color: 'white',

    border: '1px grey none',
    borderRadius: '40px',
    boxShadow: '0px 2px 10px grey'
}));