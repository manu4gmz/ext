// el inicio de la app
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import App from "./App";
import store from "../redux";
import {Provider} from "react-redux";
//import { createBrowserHistory } from 'history';
/*
export const history = createBrowserHistory({
    basename: process.env.URL
});
*/
ReactDOM.render(
    <Provider store ={ store } >
        <BrowserRouter basename={process.env.URL}>
        	<Route path="/" component={App}/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('app')
)