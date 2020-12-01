import React, {useEffect, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getSettings} from "../../actions";
import {Link} from "react-router-dom";

const DashboardAlert = (props) => {
    const [userName, setUserName] = useState([]);
    const dispatch = useDispatch();
    const [setup, setSetUp] = useState(false);
    let state = useSelector(state => state);
    useEffect( () => {
        if(userName.length < 1) {
            dispatch(getProfile(state.auth.user.uid));
            if (state.user.user_profile.first_name) {
                dispatch(getSettings(state.user.user_profile.portal.id))
                setUserName(state.user.user_profile.first_name.charAt(0).toUpperCase() + state.user.user_profile.first_name.slice(1))
            }
        }
    },);


    useEffect( () => {
        if(state.settings.settings) {
            if(Object.keys(state.settings.settings ).length > 0) {
                if(state.settings.settings.inventorySetUp !== true) {
                    setSetUp(true)
                }
            }
        }
    },);

    if(userName.length > 0 && setup) {
        return (
            <Jumbotron>
                <h1>Welcome, {userName}</h1>
                <p>
                    Welcome to Abacus Dental Inventory Management System! Feel free to look around. We've populated the
                    application
                    and dashboard with some placeholder data to help you get a sense of what your experience will be
                    like. When you're ready,
                    click the buttons below to get started with your account set up!
                </p>
                <p>
                    <Button variant="primary"><Link to="/settings">Set Up My Portal</Link></Button>
                     <Button variant="primary"><Link to="/inventory/setup">Set Up My Inventory</Link></Button>
                </p>
            </Jumbotron>
        )
    }else{
        return <></>
    }
};

export default DashboardAlert;