import React from "react";
import {Grid, Button, Container} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./newPassword.module.scss"
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../Pages/Pages";
import {sendNewPassword} from "./newPassword-reducer";
import CustomPasswordField from "./passwordField/CustomPasswordField";

const RestorePassword = () => {

    const dispatch = useAppDispatch()

    const {token} = useParams();

    const haveToRedirect = useAppSelector<boolean>(state => state.newPass.haveToRedir)

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: (value) => {
            const errors: FormikErrorType = {}
            if (!(value.password.length >= 7)) {
                errors.password = "The password must have more than 7 characters"
            }
            return errors
        },
        onSubmit: value => {
            dispatch(sendNewPassword(value.password, token ? token : "Some token"))
            formik.resetForm()
        },
    })

    if (haveToRedirect) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Container fixed>
            <Grid container justifyContent={"center"} height={"calc(100vh - 60px)"}>
                <Grid item>
                    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                        <label className={styles.textTopLabel}>
                            Create new password
                        </label>
                        <CustomPasswordField id="standard-basic"
                                             variant="standard"
                                             label={"Password"}
                                             className={styles.textField}
                                             error={!!formik.errors.password}
                                             helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                             {...formik.getFieldProps("password")}
                        ></CustomPasswordField>

                        <label className={styles.textDescription}>
                            Create new password and we will send you further instructions to email
                        </label>

                        <Button type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                className={styles.buttonSend}
                        >Create new password</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

type FormikErrorType = {
    password?: string
}

export default RestorePassword;