import React, {useEffect} from "react";
import {Box, Button, Container, Grid, styled, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {restorePassword, toggleSend} from "./restorePassword-reducer";
import {PATH} from "../../pages/Pages";
import * as Yup from "yup";
import sendImage from "../../../assets/Group 281.png"

const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
})

export const RestorePassword = () => {

    const emailInState = useAppSelector(state => state.restorePass.email)
    const isLogged = useAppSelector(state => state.profile.isLogged)
    const isSend = useAppSelector(state => state.restorePass.isSend)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            dispatch(toggleSend(null, false))
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailSchema,
        onSubmit: async value => {
            let res = await dispatch(restorePassword(value.email))
            if (res) formik.resetForm()
        },
    })

    useEffect(() => {
        if (isLogged) {
            navigate(PATH.PROFILE)
        }
    }, [isLogged])

    return (
        <RestorePasswordContainer>
            <Grid container justifyContent={"center"}>
                <Grid item>
                    {!isSend
                        ?
                        <form onSubmit={formik.handleSubmit}>
                            <FormBox>
                                <TextLabel>
                                    Forgot your password?
                                </TextLabel>
                                <TextFieldForgot id={"standard-basic"}
                                                 variant={"standard"}
                                                 label={"Email"}
                                                 InputLabelProps={{
                                                     style: {"font": "Montserrat"},
                                                 }}
                                                 error={!!formik.errors.email}
                                                 helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}

                                                 {...formik.getFieldProps("email")}
                                ></TextFieldForgot>


                                <TextDecoration>
                                    Enter your email address and we will send you further instructions
                                </TextDecoration>

                                <Button type={"submit"}
                                        variant={"contained"}
                                        color={"primary"}
                                        sx={{
                                            maxWidth: "100%",
                                            height: "36px",
                                            margin: "0 26px",
                                            textTransform: "none",
                                        }}
                                >Send Instructions</Button>

                                <TextRememberBox>
                                    Did you remember your password?
                                </TextRememberBox>

                                <NavLink to={PATH.LOGIN} style={{
                                    margin: "11px auto 35px auto",

                                    color: "var(--text-color3)",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    textAlign: "center",
                                }}>Try to login</NavLink>
                            </FormBox>
                        </form>

                        : <FormBox>
                            <TextLabel>
                                Check Email
                            </TextLabel>

                            {!!emailInState && <Box
                                component="img"
                                sx={{
                                    width: "108px",
                                    height: "108px",
                                    margin: "0 auto",
                                    borderRadius: "50%",
                                    mb: "15px"
                                }}
                                alt="The house from the offer."
                                src={sendImage}
                            />}

                            <TextDecoration sx={{textAlign: "center"}}>
                                {emailInState
                                    ? "We’ve sent an Email with instructions to \n" + emailInState
                                    : "Some error occurred"}
                            </TextDecoration>

                            <NavLink to={PATH.LOGIN} style={{
                                margin: "11px 0 35px 0",
                                width: "100%",

                                color: "var(--text-color3)",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "16px",
                                lineHeight: "24px",
                                textAlign: "center",
                                textDecoration: "none",
                            }}>
                                <Button type={"submit"}
                                        variant={"contained"}
                                        color={"primary"}
                                        sx={{
                                            minWidth: "80%",
                                            height: "36px",
                                            margin: "0 13px",
                                            textTransform: "none",
                                        }}
                                >Back to login</Button>
                            </NavLink>
                        </FormBox>
                    }
                </Grid>
            </Grid>
        </RestorePasswordContainer>
    );
};

export const RestorePasswordContainer = styled(Container)(({theme}) => ({
    zIndex: "-1",
    margin: "60px auto"
}));

export const FormBox = styled(Box)(({theme}) => ({
    maxWidth: "420px",
    minWidth: "260px",
    maxHeight: "456px",

    backgroundColor: "var(--bg4)",

    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
}));

export const TextLabel = styled(Box)(({theme}) => ({
    height: "52px",
    margin: "35px 52px 15px 52px",

    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "26px",
    lineHeight: "26px",

    textAlign: "center",
    color: "var(--text-color1)",

    [theme.breakpoints.down("sm")]: {
        fontSize: "22px",
    },
}));

export const TextFieldForgot = styled(TextField)(({theme}) => ({
    maxWidth: "100%",
    height: "72px",
    margin: "0 32px",
}));


export const TextDecoration = styled(Box)(({theme}) => ({
    minHeight: "48px",
    margin: "6px 32px 30px 32px",

    fontSize: "14px",
    lineHeight: "24px",

    color: "var(--text-color1)",
    opacity: "0.8",
}));

export const TextRememberBox = styled(Box)(({theme}) => ({
    minHeight: "24px",
    width: "100%",
    margin: "18px 0 0 0",

    lineHeight: "24px",
    textAlign: "center",

    color: "var(--text-color1)",
    opacity: "0.5",
}));

