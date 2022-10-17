import React from "react";
import {Grid, TextField, Button, Container} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../../app/hooks";
import styles from "./restorePassword.module.scss"
import {PATH} from "../Pages/Pages";
import {NavLink} from "react-router-dom";


const RestorePassword = () => {

    const dispatch = useAppDispatch()

    const isSended = true;

    // const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (value) => {
            const errors: FormikErrorType = {}
            if (!value.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
                errors.email = "Invalid email address"
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
                    {isSended
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

                                       {...formik.getFieldProps("email")}
                            ></TextField>
                            {formik.touched.email && formik.errors.email ?
                                <div className={styles.error}>{formik.errors.email}</div> : null}

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
                                to {formik.values.email ? formik.values.email : "someemail@somemail.com"}
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

type FormikErrorType = {
    email?: string
}

export default RestorePassword;