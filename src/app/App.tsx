import React from "react";
import "./App.css";
import {HashRouter} from "react-router-dom";
import {Pages} from "../features/pages/Pages";
import {PageNavigation} from "../features/pageNavigation/PageNavigation";

export const App = () =>
    (
    <div className="App">
        <HashRouter>
            <PageNavigation/>
            <Pages/>
        </HashRouter>
    </div>
);
