import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getNotifications, getPortal, getProfile} from "../../actions";
import {db} from "../../config/firebase";
import {readMessage} from "./Notifications";

/**
 * Get the user profile of the logged in user
 * @return user_profile object
 */
export function useUserProfile(){
    const state = useSelector(state => state);
    if(state.user.user_profile.hasOwnProperty('email')){
        return state.user.user_profile;
    }
}

export function useAuth(){
    const state = useSelector(state => state)
    if(state.auth.isAuthenticated){
        return state.auth.user.uid
    }
    return null;
}

export function usePortal(){
    const profile = useUserProfile();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [portal, setPortal] = useState([]);
    React.useEffect( () => {
        if(profile && profile.portal) {
            dispatch(getPortal(profile.portal.id));
            if (state.portal.receivedPortal && portal.length < 1) {
                setPortal(state.portal.portal);
                let admins = [];
                let users = [];
                for(let i = 0; i < state.portal.portal.admins.length; i++){
                    admins.push(state.portal.portal.admins[i].id)
                }
                for(let i = 0; i < state.portal.portal.users.length; i++){
                    users.push(state.portal.portal.users[i].id)
                }
                if (admins.length > 0){
                    localStorage.setItem('portalAdmins', JSON.stringify({admins:admins}))
                }
                if (users.length > 0){
                    localStorage.setItem('portalUsers', JSON.stringify({users:users}))
                }
                if(state.portal.portal.display_name){
                    localStorage.setItem('portalDisplay', state.portal.portal.display_name)
                }
            }
        }
    }, [state.portal.receivedPortal]);
    return portal
}

export function fetchUser(uid){
    if (uid) {
        const promise = db.collection('users')
            .doc(uid)
            .get();
        const userPromise = promise.then( (user) => {
            return user.data();
        });
        return userPromise;
    }
}