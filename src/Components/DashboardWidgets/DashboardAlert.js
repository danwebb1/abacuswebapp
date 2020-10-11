import React, {useEffect, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../actions";
import {Link} from "react-router-dom";

const DashboardAlert = (props) => {
    const [userName, setUserName] = useState([]);
    const dispatch = useDispatch();
    let state = useSelector(state => state);
    useEffect( () => {
        if(userName.length < 1){
            dispatch(getProfile(state.auth.user.uid));
            if (state.user.user_profile.first_name)
                setUserName(state.user.user_profile.first_name.charAt(0).toUpperCase() + state.user.user_profile.first_name.slice(1))
            }
    },);

    return (
        <Jumbotron>
          <h1>Welcome, {userName}</h1>
          <p>
            Welcome to Abacus Dental Inventory Management System! Feel free to look around. We've populated the application
              and dashboard with dummy data to help you get a sense of what your experience will be like. When you're ready, go to your <a href="/settings">settings</a> page to get started!
          </p>
          <p>
              <Button variant="primary"><Link to="/settings">Set Up My Abacus</Link></Button>
          </p>
        </Jumbotron>
    )
};

export default DashboardAlert;