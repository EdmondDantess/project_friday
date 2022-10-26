import React, {useEffect} from "react";
import {Button, Container, Grid} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./newPassword.module.scss"
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {sendNewPassword} from "./newPassword-reducer";
import CustomPasswordField from "../../common/components/passwordField/CustomPasswordField";
import {PATH} from "../pages/Pages";
import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
    password: Yup.string().min(7, "The password must have more than 7 characters.").max(100, "Too Long.").required("Required")
})

export const NewPassword = () => {

    const isLogged = useAppSelector(state => state.profile.isLogged)
    const isSend = useAppSelector(state => state.newPass.isSend)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {token} = useParams();

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: passwordSchema,
        onSubmit: async value => {
            let res = await dispatch(sendNewPassword(value.password, token ? token : "Some token"))
            if (res) formik.resetForm()
        },
    })

    useEffect(() => {
        if (isLogged) {
            navigate(PATH.PROFILE)
        }
    }, [isLogged])

    if (isSend) {
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
                                disabled={!!formik.errors.password}
                                className={styles.buttonSend}
                        >Create new password</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};
