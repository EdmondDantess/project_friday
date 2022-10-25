import React, {useEffect} from 'react';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import eye from '../../assets/images/eye.png'
import css from './css.module.scss';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
})

const FriendsPack = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPass, isShowPass] = React.useState(false);
    const isLogged = useAppSelector<boolean>(state => state.profile.isLogged)


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

        }
    })

    return (
        <Container fixed>
            friends pack
        </Container>
    )
}

export default FriendsPack;