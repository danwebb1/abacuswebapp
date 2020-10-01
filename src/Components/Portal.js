import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from ".././actions";
import PortalInventoryQuickView from "./DashboardWidgets/PortalInventoryQuickView";
import DashboardAlert from "./DashboardWidgets/DashboardAlert";



const Portal = (props) => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    let state = useSelector(state => state);
    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(state.auth.user.uid));
           setProfile(true);
        }

        if(state.user.user_profile && state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(state.user.user_profile)
           }
    }, [profile]);

    return (
        <React.Fragment>
            <DashboardAlert />
            <PortalInventoryQuickView profile={user}/>
        </React.Fragment>
    )
};

export default Portal;