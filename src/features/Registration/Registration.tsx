import React from 'react';
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

type errorType = {
    email: string
    password: string
}

const Registration = () => {

    const dispatch = useAppDispatch();

    const [showPass, isShowPass] = React.useState(false);

    function showPassHandler() {
        isShowPass(!showPass)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        validate: (values) => {
            const errors: Partial<errorType> = {};

            if(!values.email) {
                errors.email = 'Email is required';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Incorrect email address';
            } 

            if(!values.password) {
                errors.password = 'Password is required';
            }
           
            return errors
        },
        onSubmit: values => {
            //dispatch(login(values))
        }
    })

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
                        className={css.password}
                    />
                    <button className={css.eye} onClick={showPassHandler}>
                        <img src={eye} alt="eye"/>
                    </button>
                </div>

                <div className={css.wrapper}>
                    <TextField
                        name="confirm"
                        onChange={formik.handleChange}
                        value={formik.values.confirm}
                        type={showPass === false ? 'password' : 'text'}
                        label="Password"
                        size="small"
                        variant="standard"
                        className={css.password}
                    />
                    <button className={css.eye} onClick={showPassHandler}>
                        <img src={eye} alt="eye"/>
                    </button>
                </div>

                <button type="submit" className={css.button}>Sign Up</button>

                <p className={css.attention}>Already have an account?</p>

                <NavLink className={css.register} to="/login">Sign In</NavLink>
            </form>
        </Container>
    )
}

export default Registration