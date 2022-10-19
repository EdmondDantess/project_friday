import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../Pages/Pages";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@mui/material";
import styles from "./pageNavigation.module.scss";

const PageNavigation = () => {
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
                    <Button type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            className={styles.buttonLog}
                    >Sign in</Button>
                </div>
                {/*{isLoggedIn && <Button href={"/login"} color="inherit" onClick={LogOutHandler}>Log out</Button>}*/}
            </div>
        </div>
    );
};

export default PageNavigation;