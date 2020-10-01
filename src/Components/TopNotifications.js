import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const TopNotifications = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [firstLetter, setFirstLetter] = useState('');
    let dispatch = useDispatch();
    let app_state = useSelector(state => state);


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


    return (
        <div>
            <FontAwesomeIcon icon={faBell} />
            <span style={{backgroundColor: '#3196b2'}}><Link to="/my-account">{fetchLetter()}</Link></span>
        </div>
    )
};

export default TopNotifications;