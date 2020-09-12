import React from 'react';
import {useSelector} from "react-redux";
import { Router } from "@reach/router";
import './App.css';
import Login from "./Login.js"
import Dashboard from "./Components/Dashboard.js"
import ResetPassword from "./ResetPassword";
import SignUp from "./Signup";

function App() {
    const store = useSelector(store => store);
    //let user = store.auth.user
    let user = null
    return (
        user ?
            <Dashboard/>
            :
            <Router>
                <Login path="/"/>
                <ResetPassword path="/reset-password"/>
                <SignUp path="/sign-up" />
            </Router>

    );
}

export default App;
