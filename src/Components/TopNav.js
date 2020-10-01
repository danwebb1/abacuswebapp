import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import {Link} from "react-router-dom";


const TopNav = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    let app_state = useSelector(state => state);
    let dispatch = useDispatch()

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(app_state.user.user_profile)
           }
    }, );

    const subMenuMapper = (path) => {
        console.log(path)
        if( path === '/inventory') {
            return {
                parent: {
                    path: "/inventory",
                    label: "Inventory"
                },
                subMenus: [{
                    path: "/inventory/settings",
                    label: "Manage Inventory Alerts"
                }]
            }
        }
        if( path === '/my-account') {
            return {
                parent: {
                    path: "/my-account",
                    label: "My Account"
                },
                subMenus: [{
                    path: "/my-account/update-password",
                    label: "Update Password"
                }]
            }
        }
    };

    let menuProps = subMenuMapper(window.location.pathname);
    if (menuProps) {
        return (

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><span><FontAwesomeIcon icon={faBars}/></span> <Link
                    to={menuProps.parent.path}>{menuProps.parent.label}</Link></Dropdown.Toggle>
                <Dropdown.Menu>
                    {menuProps.subMenus.map((submenu) => {
                        return <Dropdown.Item><Link to={submenu.path}>{submenu.label}</Link></Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )
    }else{
       return <div></div>
    }
};

export default TopNav;