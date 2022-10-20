import React, {useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Button, CircularProgress} from "@mui/material";
import styles from "./pageNavigation.module.scss";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import {getUserInfoTC} from '../profile/profile-reducer';
import {useAppSelector} from "../../app/hooks";
import {ErrorSnackbar} from "../../common/components/ErrorSnackbar/ErrorSnackbar";

const PageNavigation = () => {
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const name = useAppSelector<string>(state => state.profile.name)
    const avatar = useAppSelector<string>(state => state.profile.avatar)
    const navigate = useNavigate()


    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)

    return (
        <div>
            <div className={styles.AppNavBar}>
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.PROFILE}>*/}
                {/*        PROFILE*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.LOGIN}>*/}
                {/*        LOGIN*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.REGISTRATION}>*/}
                {/*        REGISTRATION*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.RESTOREPASS}>*/}
                {/*        RESTOREPASS*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.NEWPASS}>*/}
                {/*        NEWPASSWORD*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={PATH.TESTSUPERCOMPONENTS}>*/}
                {/*        TESTSUPERCOMPONENTS*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}
                {/*<Typography variant="h6" component="div" sx={{flexGrow: 0}}>*/}
                {/*    <NavLink to={"/*"}>*/}
                {/*        Test Error404*/}
                {/*    </NavLink>*/}
                {/*</Typography>*/}

                <div className={styles.logoContainer}>
                    <div className={styles.itIncubLogo}></div>
                </div>
                <div className={styles.buttonLogContainer}>
                    {
                       isLogged ?
                            <div className={styles.divProfileHeader}
                                  onClick={()=>navigate('/profile')}
                            >
                                <b style={{margin: '5px 10px 0 0 '}} >{name}<hr/></b>
                                <Avatar alt={name} src={avatar}
                                        sx={{width: 36, height: 36}}/>
                            </div>
                            :   <Button type={"submit"}
                                               variant={"contained"}
                                               color={"primary"}
                                               className={styles.buttonLog}
                                               onClick={()=>navigate('/login')}
                        >Sign in</Button>
                    }

                </div>

                {circularEntity && < CircularProgress className={styles.progress}/>}

                <ErrorSnackbar/>
            </div>
        </div>
    );
};

export default PageNavigation;