import React, {useEffect} from 'react';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import eye from '../../../assets/images/eye.png'
import css from './css.module.scss';
import {NavLink, useNavigate} from 'react-router-dom';
import {isRegistrationFalseAC, register} from './register-reducer';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {PATH} from '../../pages/Pages';

const regSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('Required'),
    confirm: Yup.string().min(5).oneOf([Yup.ref('password'), null]).required('Required')
})

export const Registration = () => {

    const dispatch = useAppDispatch();

    const [showPass, isShowPass] = React.useState(false);
    const [showConfirm, isShowConfirm] = React.useState(false);
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)
    const isRegistr = useAppSelector<boolean>(state => state.registration.isReg)
    const navigate = useNavigate()


    function showPassHandler() {
        isShowPass(!showPass)
    }

    function showConfirmHandler() {
        isShowConfirm(!showConfirm)
    }

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
        <Container fixed>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <p className={css.title}>Sign Up</p>

                <TextField
                    type="text"
                    label="Email"
                    size="small"
                    className={css.field}
                    variant="standard"
                    error={!!(formik.errors.email && formik.touched.email)}
                    {...formik.getFieldProps('email')}
                />

                <div className={css.wrapper}>
                    <TextField
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type={!showPass ? 'password' : 'text'}
                        label="Password"
                        size="small"
                        variant="standard"
                        className={css.password}
                        error={!!formik.errors.password && formik.touched.password}
                    />
                    <img src={eye} className={css.eye} onClick={showPassHandler} alt="eye"/>
                </div>

                <div className={css.wrapper}>
                    <TextField
                        name="confirm"
                        onChange={formik.handleChange}
                        value={formik.values.confirm}
                        type={!showConfirm ? 'password' : 'text'}
                        label="Confirm password"
                        size="small"
                        variant="standard"
                        className={css.password}
                        error={!!(formik.errors.confirm && formik.touched.confirm)}
                    />
                    <img src={eye} className={css.eye} onClick={showConfirmHandler} alt="eye"/>
                </div>

                <button type="submit" className={css.button}>Sign Up</button>

                <p className={css.attention}>Already have an account?</p>

                <NavLink className={css.register} to="/login">Sign In</NavLink>
            </form>
        </Container>
    )
}
