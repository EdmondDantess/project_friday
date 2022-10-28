import React, {useEffect} from "react";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import styles from "./restorePassword.module.scss"
import {NavLink, useNavigate} from "react-router-dom";
import {restorePassword, toggleSend} from "./restorePassword-reducer";
import {PATH} from "../../pages/Pages";
import * as Yup from "yup";

const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
})

export const RestorePassword = () => {

    const emailInState = useAppSelector(state => state.restorePass.email)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const isSend = useAppSelector(state => state.restorePass.isSend)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            dispatch(toggleSend(null, false))
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailSchema,
        onSubmit: async value => {
            let res = await dispatch(restorePassword(value.email))
            if (res) formik.resetForm()
        },
    })

    useEffect(() => {
        if (isLogged) {
            navigate(PATH.PROFILE)
        }
    }, [isLogged])

    return (
        <Container fixed>
            <Grid container justifyContent={"center"} height={"calc(100vh - 60px)"}>
                <Grid item>
                    {!isSend
                        ? <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                            <label className={styles.textTopLabel}>
                                Forgot your password?
                            </label>
                            <TextField id="standard-basic"
                                       variant="standard"
                                       label={"Email"}
                                       className={styles.textField}
                                       InputLabelProps={{
                                           style: {"font": "Montserrat"},
                                       }}
                                       error={!!formik.errors.email}
                                       helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}

                                       {...formik.getFieldProps("email")}
                            ></TextField>


                            <label className={styles.textDescription}>
                                Enter your email address and we will send you further instructions
                            </label>

                            <Button type={"submit"}
                                    variant={"contained"}
                                    color={"primary"}
                                    className={styles.buttonSend}
                            >Send Instructions</Button>

                            <label className={styles.textRemember}>
                                Did you remember your password?
                            </label>

                            <NavLink to={PATH.LOGIN} className={styles.formLink}>Try logging in</NavLink>
                        </form>
                        : <div className={styles.divContainer}>
                            <label className={styles.textTopLabel}>
                                Check Email
                            </label>

                            <div className={styles.imgContainer}>
                            </div>

                            <label className={styles.divDescription}>
                                We’ve sent an Email with instructions
                                to {emailInState ? emailInState : "some error occurred"}
                            </label>

                            <NavLink to={PATH.LOGIN} className={styles.formLink}>
                                <Button type={"submit"}
                                        variant={"contained"}
                                        color={"primary"}
                                        className={styles.buttonSend}
                                >Back to login</Button>
                            </NavLink>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

