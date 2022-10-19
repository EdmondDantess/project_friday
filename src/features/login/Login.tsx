import React from 'react';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import eye from '../../images/eye.png'
import css from './css.module.scss';
import {NavLink} from 'react-router-dom';
import {login} from './login-reducer';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
})

const Login = () => {

    const dispatch = useAppDispatch();

    const [showPass, isShowPass] = React.useState(false);

    function showPassHandler() {
        isShowPass(!showPass)
    }

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

    console.log(formik.errors)
    console.log(formik.touched)

    return (
        <Container fixed>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <p className={css.title}>Sign in</p>

                <TextField
                    type="text"
                    label="Email"
                    size="small"
                    className={css.field}
                    variant="standard"
                    error={formik.errors.email && formik.touched.email ? true : false}
                    {...formik.getFieldProps('email')}
                />

                <div className={css.wrapper}>
                    <TextField
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type={showPass === false ? 'password' : 'text'}
                        label="Password"
                        size="small"
                        variant="standard"
                        error={formik.errors.password && formik.touched.password ? true : false}
                        className={css.password}
                    />

                    <img className={css.eye} onClick={showPassHandler} src={eye} alt="eye"/>

                </div>

                <FormControlLabel 
                    className={css.checkbox}
                    control={<Checkbox name="rememberMe" value={formik.values.rememberMe} onChange={formik.handleChange}/>} 
                    label="Remember me"
                />

                <NavLink className={css.restore} to="/restorepass">Forgot Password?</NavLink>

                <button type="submit" className={css.button}>Sign in</button>

                <p className={css.attention}>Don`t have an account?</p>

                <NavLink className={css.register} to="/registration">Sign Up</NavLink>
            </form>
        </Container>
    )
}

export default Login