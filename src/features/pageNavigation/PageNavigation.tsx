import React from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, CircularProgress} from "@mui/material";
import styles from "./pageNavigation.module.scss";
import {useAppSelector} from "../../app/hooks";
import {ErrorSnackbar} from "../../common/components/errorSnackbar/ErrorSnackbar";

const PageNavigation = () => {

    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const name = useAppSelector<string>(state => state.profile.name)
    const avatar = useAppSelector<string>(state => state.profile.avatar)
    const navigate = useNavigate()
    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)

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
                                 onClick={() => navigate("/profile")}
                            >
                                <b style={{margin: "5px 10px 0 0 "}}>{name}
                                    <hr/>
                                </b>
                                <Avatar alt={name} src={avatar}
                                        sx={{width: 36, height: 36}}/>
                            </div>
                            : <Button type={"submit"}
                                      variant={"contained"}
                                      color={"primary"}
                                      className={styles.buttonLog}
                                      onClick={() => navigate("/login")}
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