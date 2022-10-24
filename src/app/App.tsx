import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import PageNavigation from '../features/pageNavigation/PageNavigation';
import {Pages} from '../features/pages/Pages';

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
