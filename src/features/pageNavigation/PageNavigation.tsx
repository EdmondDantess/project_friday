import React, {useEffect} from "react";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {Avatar, Button, CircularProgress} from "@mui/material";
import styles from "./pageNavigation.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {ErrorSnackbar} from "../../common/components/errorSnackbar/ErrorSnackbar";
import {getUserInfoTC} from "../profile/profile-reducer";
import {PATH} from "../pages/Pages";

export const PageNavigation = () => {

    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    let routesButtonHead = useRoutes([
        {path: PATH.LOGIN, element: <span>Sign up</span>},
        {path: '*', element: <span>Sign in</span>},
    ])

    const redirectsLoginHandler = () => {
        location.pathname === `${PATH.LOGIN}` ? navigate(PATH.REGISTRATION) : navigate(PATH.LOGIN)
    }

    useEffect(() => {
        dispatch(getUserInfoTC())
    }, [dispatch])

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
                                 onClick={() => navigate(PATH.PROFILE)}
                            >
                                <b style={{margin: '5px 10px 0 0 '}}>{name}
                                    <hr/>
                                </b>
                                <Avatar alt={name !== '' ? name : 'fail'} src={avatar}
                                        sx={{width: 36, height: 36}}/>
                            </div>
                            : <Button type={'submit'}
                                      variant={'contained'}
                                      color={'primary'}
                                      className={styles.buttonLog}
                                      onClick={redirectsLoginHandler}
                            > {routesButtonHead} </Button>
                    }
                </div>

                <ErrorSnackbar/>

                {circularEntity && <CircularProgress className={styles.progress}/>}

            </div>
        </div>
    );
};
