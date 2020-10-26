import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useNotifications} from "../Utils/hooks/Notifications";

const TopNotifications = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    let dispatch = useDispatch();
    let app_state = useSelector(state => state);
    const notifications = useNotifications();


    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(app_state.user.user_profile)
           }
    }, );

    function fetchLetter(){
        if(user.first_name){
           return user.first_name.substring(0,1).toUpperCase()
        }
    }

    function check_for_new(){
        let count = 0;
        for(let i = 0; i < notifications.length; i++){
            if(notifications[i].read === false){
                count = count + 1;
            }
        }
        if(count > 0){
            return <div className="badge">{count}</div>
        }else{
            return '';
        }
    }


    return (
        <div>
            {check_for_new()}<Link to="/notifications"><FontAwesomeIcon icon={faBell} /></Link>
            <span style={{backgroundColor: '#3196b2'}}><Link to="/my-account">{fetchLetter()}</Link></span>
        </div>
    )
};

export default TopNotifications;