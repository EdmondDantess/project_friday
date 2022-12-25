import React, {useEffect} from "react";
import "./App.css";
import {HashRouter} from "react-router-dom";
import {Pages} from "../features/pages/Pages";
import {useAppDispatch, useAppSelector} from "./hooks";
import {getUserInfoTC} from "../features/profile/profile-reducer";
import {customTheme} from "../common/utils/styles";
import {ThemeProvider} from "@mui/material";

export const App = () => {

    const isLoaded = useAppSelector(state => state.userFeedback.isLoaded)

    const dispatch = useAppDispatch()

    useEffect(() => {
            if (!isLoaded) {
                dispatch(getUserInfoTC())
            }
        }, [dispatch]
    )

    return (
        <div className="App">
            {
                isLoaded && <ThemeProvider theme={customTheme}>
                    <HashRouter>
                        {/*<PageNavigation/>*/}
                        <Pages/>
                    </HashRouter>
                </ThemeProvider>
            }
        </div>
    );
}
