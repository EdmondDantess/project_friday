import React, {useEffect} from "react";
import "./App.css";
import {HashRouter} from "react-router-dom";
import {Pages} from "../features/pages/Pages";
import {PageNavigation} from "../features/pageNavigation/PageNavigation";
import {useAppDispatch, useAppSelector} from "./hooks";
import {getUserInfoTC} from "../features/profile/profile-reducer";

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
            {isLoaded &&
                <HashRouter>
                    <PageNavigation/>
                    <Pages/>
                </HashRouter>}
        </div>
    );
}
