import React, {useEffect, useMemo} from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Pages} from '../features/pages/Pages';
import {useAppDispatch, useAppSelector} from './hooks';
import {getUserInfoTC} from '../features/profile/profile-reducer';
import {getDesignTokens} from '../common/utils/styles';
import {createTheme, ThemeProvider} from '@mui/material';
import {PageNavigation} from '../features/pageNavigation/PageNavigation';

export const App = () => {

    const paletteMode = useAppSelector((state) => state.userFeedback.paletteMode);
    const isLoaded = useAppSelector(state => state.userFeedback.isLoaded)

    const dispatch = useAppDispatch()

    const theme = useMemo(
        () => createTheme(getDesignTokens(paletteMode)),
        [paletteMode]
    );

    useEffect(() => {
        document.body.setAttribute('data-theme', paletteMode);
        localStorage.setItem('paletteMode', paletteMode);
    }, [paletteMode]);

    useEffect(() => {
            if (!isLoaded) {
                dispatch(getUserInfoTC())
            }
        }, [dispatch, isLoaded]
    )

    return (
        <div className="App">
            {
                isLoaded && <ThemeProvider theme={theme}>
                    <HashRouter>
                        <PageNavigation/>
                        <Pages/>
                    </HashRouter>
                </ThemeProvider>
            }
        </div>
    );
}
