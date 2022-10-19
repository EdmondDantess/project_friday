import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserInfoTC, logoutTC, updateUserInfoTC} from "./profile-reducer";
import {Avatar, Button, IconButton, TextField} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {PhotoCamera} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {forgotPasswordAPI} from "../../api/api-restorePassword";

const Profile = () => {
    const dispatch = useAppDispatch()
    const name = useAppSelector<string>(state => state.profile.name)
    const email = useAppSelector<string>(state => state.profile.email)
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
    }
    const updateInfo = (name: string) => {
        dispatch(updateUserInfoTC({name, avatar: ""}))
    }
    const sendUpdateInfo = (name: string) => {
        updateInfo(name)
        editModeToggle()
    }

    // useEffect(() => {
    //     forgotPasswordAPI.testLogin()
    //         .then(data => console.log(data))
    //         .catch(error => console.log(error))
    //     return () => {
    //
    //     };
    // }, []);


    useEffect(() => {
        if (!isLogged) {
            return navigate("/login")
        }
        dispatch(getUserInfoTC())
    }, [isLogged, name, email])

    return (
        <div className={style.parentProfile}>
            <h2 style={{marginTop: "-20px"}}>Personal information</h2>
            <div className={style.avatar}>
                <Avatar alt={name} src="https://bit.ly/3CKLqoF"
                        sx={{width: 96, height: 96}}/>
                <IconButton color="default" aria-label="upload picture" component="label" style={{
                    margin: "-50px 50px 0px",
                }}>
                    <input hidden accept="image/*" type="file"/>
                    <PhotoCamera/>
                </IconButton>
            </div>
            {
                !editMode ?
                    <span onDoubleClick={editModeToggle}>
                        {name}
                        <IconButton
                            onClick={editModeToggle}
                            color="default" style={{
                            marginTop: "-10px",
                        }}>
                        <BorderColorOutlinedIcon/>
                        </IconButton></span>
                    : <>
                        <TextField InputProps={{
                            endAdornment: <Button variant="contained" size={"medium"}
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
                        marginTop: "29px",
                        color: "black",
                        border: "1px grey none",
                        borderRadius: "90px",
                        boxShadow: "0px 2px 10px grey"
                    }}
            ><LogoutRoundedIcon/>Logout</Button>
        </div>
    )
}

export default Profile