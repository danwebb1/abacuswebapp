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


    const menu = [
        {
            path: "/",
            label: "Home"
        },{
            path: "/my-account",
            label: "My Account"
        },{
            path: "/my-account/update-password",
            label: "Update Password"
        },{
            path: "/settings",
            label: "Settings"
        },{
            path: "/inventory",
            label: "Inventory"
        },{
            path: "/inventory/setup",
            label: "Inventory Set Up"
        },{
            path: "/inventory/settings",
            label: "Inventory Settings"
        },{
            path: "/order",
            label: "Order"
        },{
            path: "/analytics",
            label: "Analytics"
        },{
            path: "/support",
            label: "Contact Support"
        },{
            path: "/notifications",
            label: "Notifications"
        }
    ];

    const menuMapper = (path) => {
        let displayItem;
        for(let i = 0; i < menu.length; i++){
            if(path === menu[i].path){
                displayItem = menu[i].label
            }
        }

        return displayItem ? displayItem : '';
    };

    const display = menuMapper(window.location.pathname);

    return (

            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}><span><FontAwesomeIcon icon={faBars}/></span>
                    { display }</Dropdown.Toggle>
                <Dropdown.Menu>
                    {menu.map((menu) => {
                        if(window.location.pathname !== menu.path) {
                            return <Dropdown.Item><Link to={menu.path}>{menu.label}</Link></Dropdown.Item>
                        }
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )

};

export default TopNav;