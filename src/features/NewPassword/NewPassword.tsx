import React from "react";
import {Grid, Button, Container, TextField, IconButton} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../../app/hooks";
import styles from "./newPassword.module.scss"
import InputAdornment from "@mui/material/InputAdornment";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const RestorePassword = () => {

    const dispatch = useAppDispatch()

    // const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: (value) => {
            const errors: FormikErrorType = {}
            if (!value.password) {
                errors.password = "Required"
            }
            return errors
        },
        onSubmit: value => {
            // dispatch(loginMe(values))
            console.log(value)
            alert(value)
            formik.resetForm()
        },
    })

    return (
        <Container fixed>
            <Grid container justifyContent={"center"} height={"calc(100vh - 60px)"}>
                <Grid item>
                    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                        <label className={styles.textTopLabel}>
                            Create new password
                        </label>
                        <TextField id="standard-basic"
                                   variant="standard"
                                   label={"Password"}
                                   type={"password"}
                                   className={styles.textField}
                                   InputLabelProps={{
                                       style: {"font": "Montserrat"},
                                   }}
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={() => {
                                                   }}
                                                   onMouseDown={() => {
                                                   }}
                                               >
                                                   {false ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}

                                   {...formik.getFieldProps("password")}
                        ></TextField>


                        {formik.touched.password && formik.errors.password ?
                            <div className={styles.error}>{formik.errors.password}</div> : null}

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