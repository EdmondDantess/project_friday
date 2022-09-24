import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pages from './components/Pages/Pages';
import {HashRouter} from 'react-router-dom';
import PageNavigation from './components/Pages/PageNavigation/PageNavigation';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <PageNavigation/>
                <Pages/>
            </HashRouter>
        </div>
    );
}

export default App;
