import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Avatar, Button, CircularProgress, Container } from "@mui/material";
import styles from './pageNavigation.module.scss';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ErrorSnackbar} from '../../common/components/errorSnackbar/ErrorSnackbar';
import {getUserInfoTC} from '../profile/profile-reducer';
import {PATH} from '../pages/Pages';

const PageNavigation = () => {
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const name = useAppSelector<string>(state => state.profile.name)
    const avatar = useAppSelector<string>(state => state.profile.avatar)
    const navigate = useNavigate()
    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)

    useEffect(() => {
        dispatch(getUserInfoTC())
    }, [])

    return (
        <div>

            <div className={styles.AppNavBar}>
                <div className={styles.logoContainer}>
                    <div className={styles.itIncubLogo}></div>
                </div>
                <div className={styles.buttonLogContainer}>
                    {
                        isLogged ?
                            <div className={styles.divProfileHeader}
                                 onClick={() => navigate('/profile')}
                            >
                                <b style={{margin: '5px 10px 0 0 '}}>{name}
                                    <hr/>
                                </b>
                                <Avatar alt={name} src={avatar}
                                        sx={{width: 36, height: 36}}/>
                            </div>
                            : <Button type={'submit'}
                                      variant={'contained'}
                                      color={'primary'}
                                      className={styles.buttonLog}
                                      onClick={() => navigate(PATH.LOGIN)}
                            >Sign in</Button>
                    }
                </div>

                <ErrorSnackbar/>

                {circularEntity && <CircularProgress className={styles.progress}/>}

            </div>
        </div>
    );
};

export default PageNavigation;