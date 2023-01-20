import React, {useEffect} from "react";
import {Box, Button, Container, Grid, styled} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {sendNewPassword} from "./newPassword-reducer";
import CustomPasswordField from "../../../common/components/passwordField/CustomPasswordField";
import {PATH} from "../../pages/Pages";
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
        <NewPasswordContainer>
            <Grid container justifyContent={"center"}>
                <Grid item>
                    <NewPasswordFormBox>
                        <form onSubmit={formik.handleSubmit}>
                            <NewPasswordTextLabel>
                                Create new password
                            </NewPasswordTextLabel>
                            <CustomPasswordField id="standard-basic"
                                                 variant="standard"
                                                 label={"Password"}
                                                 sx={{
                                                     width: "calc(100% - 64px)",
                                                     margin: "0 32px 10px",
                                                 }}
                                                 error={!!formik.errors.password}
                                                 helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                                 {...formik.getFieldProps("password")}
                            ></CustomPasswordField>

                            <NewPasswordTextDecoration>
                                Create new password and we will send you further instructions to email
                            </NewPasswordTextDecoration>

                            <Button type={"submit"}
                                    variant={"contained"}
                                    color={"primary"}
                                    disabled={!!formik.errors.password}
                                    sx={{
                                        width: "calc(100% - 64px)",
                                        height: "36px",
                                        margin: "0 32px 32px 32px",
                                        textTransform: "none",
                                    }}
                            >Create new password</Button>
                        </form>
                    </NewPasswordFormBox>
                </Grid>
            </Grid>
        </NewPasswordContainer>
    );
};

export const NewPasswordContainer = styled(Container)(({theme}) => ({
    zIndex: "-1",
    margin: "60px auto"
}));

export const NewPasswordFormBox = styled(Box)(({theme}) => ({
    maxWidth: "420px",
    minWidth: "260px",
    maxHeight: "456px",

    backgroundColor: "var(--bg4)",

    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
}));

export const NewPasswordTextLabel = styled(Box)(({theme}) => ({
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

export const NewPasswordTextDecoration = styled(Box)(({theme}) => ({
    minHeight: "48px",
    margin: "6px 32px 30px 32px",

    fontSize: "14px",
    lineHeight: "24px",

    color: "var(--text-color1)",
    opacity: "0.8",
}));