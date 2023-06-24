import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App';
import GlobalAppContext from './context/AppContext';

const el = document.getElementById('root')

const root = ReactDom.createRoot(el)

root.render(
    <GlobalAppContext>
        <App/>

    </GlobalAppContext>
)