import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import PageNavigation from '../features/PageNavigation/PageNavigation';
import Pages from '../features/Pages/Pages';

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
