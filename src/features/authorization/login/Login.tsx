import CustomPasswordField from '../../../common/components/passwordField/CustomPasswordField';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import FormControlLabel from '@mui/material/FormControlLabel';
import {NavLink, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {Box, styled} from '@mui/material';
import Button from '@mui/material/Button';
import React, {useEffect} from 'react';
import {PATH} from '../../pages/Pages';
import {login} from './login-reducer';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be 8 characters or more').max(50, 'Too Long!').required('Required'),
})

export const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe))
        }
    })

    useEffect(() => {
        if (isLogged) {
            navigate(PATH.PROFILE)
        }
    }, [isLogged])

    return (
        <Container fixed>
            <FormLogin onSubmit={formik.handleSubmit}>
                <Title>Sign in</Title>

                <TextField
                    type="text"
                    label="Email"
                    size="small"
                    variant="standard"
                    error={!!(formik.errors.email && formik.touched.email)}
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}

                    {...formik.getFieldProps('email')}
                />

                <Box>
                    <CustomPasswordField
                        label="Password"
                        size="small"
                        variant="standard"
                        sx={{
                            width: '100%',
                            mt: '10px',
                        }}
                        {...formik.getFieldProps('password')}
                        error={!!formik.errors.password && formik.touched.password}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    />
                </Box>

                <FormControlLabel
                    sx={{
                        mt: '5px',
                        color: 'var(--text-color1)',
                    }}
                    control={<Checkbox name="rememberMe" value={formik.values.rememberMe}
                                       onChange={formik.handleChange}/>}
                    label="Remember me"
                />

                <NavForgotPass to="/restorepass">Forgot Password?</NavForgotPass>

                <Button type="submit"
                        sx={{
                            width: 'calc(100% - 64px)',
                            color: 'white',
                            margin: '10px 32px 0 32px',
                        }}
                >Sign in</Button>
                <FooterTitle>Don`t have an account?</FooterTitle>
                <NavRegistration to="/registration">Sign Up</NavRegistration>
            </FormLogin>
        </Container>
    )
}

export const FormLogin = styled('form')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    margin: '60px auto 48px',
    padding: '35px',
    maxWidth: '413px',

    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    background: 'var(--bg4)',

    [theme.breakpoints.down('lg')]: {
        width: '852px',
    },
    [theme.breakpoints.down('md')]: {
        width: '552px',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
    },
}));
const Title = styled('p')(({theme}) => ({
    color: 'var(--text-color1)',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '26px',
    lineHeight: '32px',
}))
const FooterTitle = styled('p')(({theme}) => ({
    marginTop: '21px',

    color: 'var(--text-color1)',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center',

    opacity: '0.5',
}))
const NavForgotPass = styled(NavLink)(({theme}) => ({
    marginTop: '24px',

    color: 'var(--text-color1)',
    textAlign: 'right',
    fontSize: '14px'
}))
const NavRegistration = styled(NavLink)(({theme}) => ({
    marginTop: '15px',

    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'var(--text-color3)',
}))
