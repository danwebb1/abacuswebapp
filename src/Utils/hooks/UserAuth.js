import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getNotifications, getPortal, getProfile, getSettings} from "../../actions";
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
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);


    React.useEffect( () => {
        if(profile && profile.portal) {
            dispatch(getSettings(profile.portal.id));
            if (state.settings.receivedSettings) {
                if (state.settings.settings) {
                    const permissions = {
                        userAddMappings: state.settings.settings.userAddMappings,
                        userAddUsers: state.settings.settings.userAddUsers,
                        userInventoryUpdate: state.settings.settings.userInventoryUpdate,
                        userViewSettings: state.settings.settings.userViewSettings
                    };
                    localStorage.removeItem('abacusPermissions');
                    localStorage.setItem('abacusPermissions', JSON.stringify(permissions))
                }
            }
        }
    },[state.settings.receivedSettings]);

    React.useEffect( () => {
         if(profile && profile.portal) {
            dispatch(getPortal(profile.portal.id));
            dispatch(getSettings(profile.portal.id));
            if (state.portal.receivedPortal && portal.length < 1) {
                setPortal(state.portal.portal)
                if(state.portal.portal.admins.length > 0){
                    setAdmins(state.portal.portal.admins)
                }
                if(state.portal.portal.users.length > 0){
                    setUsers(state.portal.portal.users)
                }
                if (state.portal.portal.display_name) {
                        localStorage.setItem('portalDisplay', state.portal.portal.display_name)
                }
            }

         }
    }, [state.portal.receivedPortal]);

    React.useEffect(  () => {
                if(admins.length > 0) {
                    GetUsers(admins, 'admins')
                }

    }, [admins]);

     React.useEffect( () => {
                if(users.length > 0) {
                        GetUsers(users, 'users')
                }

    }, [users]);

    return portal;
}
export async function GetUsers(users, type){
     let _users = [];
     for (let i = 0; i < users.length; i++) {
         let _user = await fetchUser(users[i].id);
         if(_user){
             if(_user.email){
                 _users.push(_user.email)
             }
         }
     }
     if (_users.length > 0) {
         if(type === 'admins') {
             localStorage.setItem('portalAdmins', JSON.stringify({admins: _users}))
         }
         if (type === 'users'){
             localStorage.setItem('portalUsers', JSON.stringify({users: _users}))
         }
     }

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