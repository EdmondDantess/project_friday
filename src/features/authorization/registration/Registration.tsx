import React, {useEffect} from 'react';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import {NavLink, useNavigate} from 'react-router-dom';
import {isRegistrationFalseAC, register} from './register-reducer';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {PATH} from '../../pages/Pages';
import {Box, Button, styled} from "@mui/material";
import CustomPasswordField from "../../../common/components/passwordField/CustomPasswordField";

const regSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Password must be 7 characters or more').max(50, 'Too Long!').required('Required'),
    confirm: Yup.string().min(7).oneOf([Yup.ref('password'), null], "Passwords must match").required('Required')
})

export const Registration = () => {

    const dispatch = useAppDispatch();
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const isRegistr = useAppSelector<boolean>(state => state.registration.isReg)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        validationSchema: regSchema,
        onSubmit: values => {
            dispatch(register(values.email, values.password))

        }
    })

    useEffect(() => {
        if (isLogged) {
            navigate(PATH.PROFILE)
        }
    }, [isLogged, navigate])

    useEffect(() => {
        return () => {
            dispatch(isRegistrationFalseAC())
        }
    }, [dispatch, isRegistr])

    if (isRegistr) {
        navigate(PATH.LOGIN)
    }

    return (
        <RegistrationContainer>
            <RegistrationFormBox>
                <form onSubmit={formik.handleSubmit}>
                    <RegistrationTextLabel>Sign Up</RegistrationTextLabel>

                    <TextField
                        type="text"
                        label="Email"
                        size="small"
                        sx={{
                            width: "100%",
                            mt: "10px",
                        }}
                        variant="standard"
                        {...formik.getFieldProps('email')}
                        error={!!(formik.errors.email && formik.touched.email)}
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    />

                    <CustomPasswordField
                        label="Password"
                        size="small"
                        variant="standard"
                        sx={{
                            width: "100%",
                            mt: "10px",
                        }}
                        {...formik.getFieldProps('password')}
                        error={!!formik.errors.password && formik.touched.password}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    />

                    <CustomPasswordField
                        label="Confirm password"
                        size="small"
                        variant="standard"
                        sx={{
                            width: "100%",
                            mt: "10px",
                        }}
                        {...formik.getFieldProps('confirm')}
                        error={!!(formik.errors.confirm && formik.touched.confirm)}
                        helperText={formik.touched.confirm && formik.errors.confirm ? formik.errors.confirm : null}
                    />


                    <Button type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            disabled={!!formik.errors.email && !!formik.errors.password && !!formik.errors.confirm}
                            sx={{
                                width: "calc(100% - 64px)",
                                height: "36px",
                                margin: "70px 32px 0 32px",
                                textTransform: "none",
                            }}
                    >Sign Up</Button>

                    <RegistrationTextDecoration>Already have an account?</RegistrationTextDecoration>

                    <Box sx={{
                        width: "100%",
                        margin: "15px auto 0",
                        textAlign: "center",
                        textTransform: "none",
                    }}>
                        <NavLink style={{
                            fontSize: "16px",
                            color: "var(--text-color3)",
                            fontWeight: "600"
                        }} to={PATH.LOGIN}>Sign In</NavLink>
                    </Box>

                </form>
            </RegistrationFormBox>
        </RegistrationContainer>
    )
}

export const RegistrationContainer = styled(Container)(({theme}) => ({
    zIndex: "-1",
    margin: "60px auto"
}));

export const RegistrationFormBox = styled(Box)(({theme}) => ({
    maxWidth: "413px",
    minWidth: "260px",


    margin: "0 auto",
    padding: "35px",

    backgroundColor: "var(--bg4)",

    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
}));

export const RegistrationTextLabel = styled(Box)(({theme}) => ({
    fontWeight: "600",
    fontSize: "26px",
    lineHeight: "32px",

    textAlign: "center",
    color: "var(--text-color1)",

    [theme.breakpoints.down("sm")]: {
        fontSize: "22px",
    },
}));

export const RegistrationTextDecoration = styled(Box)(({theme}) => ({
    margin: "30px auto 0",

    textAlign: "center",
    fontSize: "14px",
    lineHeight: "24px",

    color: "var(--text-color1)",
    opacity: "0.8",
}));