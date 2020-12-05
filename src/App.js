import React, {useEffect, useState} from 'react';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useHistory} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import './App.css';
import Login from "./Login.js"
import Portal from "./Components/Portal.js"
import ResetPassword from "./ResetPassword";
import SignUp from "./Signup";
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {homepage_style, app_style} from "./Styles";
import {getProfile, logoutUser} from "./actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faChartBar, faBars, faUserEdit, faSignOutAlt, faTruck, faHeadset, faCog } from '@fortawesome/free-solid-svg-icons'
import Inventory from "./Components/Inventory/Inventory";
import MyAccount from "./Components/MyAccount";
import UpdatePassword from "./Components/UpdatePassword";
import Order from "./Components/Order";
import Analytics from "./Components/Analytics";
import Support from "./Components/Support";
import {Redirect} from "react-router";
import Settings from "./Components/SettingsViews/Settings";
import TopNav from "./Components/TopNav";
import TopNotifications from "./Components/TopNotifications";
import Notifications from "./Components/Notifications";
import AddUser from "./Components/SettingsViews/Portal/AddUser";
import EditUsers from "./Components/SettingsViews/Portal/EditUsers";
import EditAdmins from "./Components/SettingsViews/Portal/EditAdmins";
import InventorySetUp from "./Components/Inventory/InventorySetUp";
import EditPortal from "./Components/SettingsViews/Portal/EditPortal";
import InventorySettings from "./Components/Inventory/InventorySettings";
import {usePortal} from "./Utils/hooks/UserAuth";
const logo = '/images/abacus_logo.png';

function App(){
    const _permissions = localStorage.getItem('abacusPermissions') ? localStorage.getItem('abacusPermissions') : false;
    const [permissions, setPermissions] = useState(_permissions);
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState(false);
    const [progress, setProgress] = useState(15);
    const [role, setRole] = useState(null);
    const [viewSettings, setViewSettings] = useState(false);
    const [addMappings, setAddMappings] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    let state = useSelector(state => state);
    let dispatch = useDispatch();
    const portal = usePortal();
    useEffect(() => {
        if (!state.auth.isLoggingOut){
            let _check_auth = state.auth.isAuthenticated;
            setIsAuth(_check_auth)
        }

    }, [state.auth]);

    useEffect(() => {
        if (!profile) {
            if(isAuth) {
                dispatch(getProfile(state.auth.user.uid));
                setProfile(true);
            }
        }
        if(state.user.user_profile && state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(state.user.user_profile)
        }
        if(user) {
            if (user.role === 'admin') {
                setRole('admin')
            } else {
                setRole('user')
            }
        }
    }, );

    useEffect( () => {
        let _permObj;
        if(permissions){
            if(typeof permissions === 'string') {
                _permObj = JSON.parse(permissions);
            }else{
                _permObj = permissions
            }
            if(user) {
                if (user.role !== 'admin') {
                    setViewSettings(_permObj.userViewSettings);
                    setAddMappings(_permObj.userAddMappings)
                }
            }
        }
    },[_permissions]);

    const signOut = () =>{
        dispatch(logoutUser());
        setIsAuth(false);
        window.location.pathname = '/';
    };
    if(isAuth) {
        let load_portal = portal;
        document.body.style.backgroundColor = app_style.bodyStyle.backgroundColor;
        if (role) {

            return (
                <div>
                    <Router>
                        <div id="menu">
                            <div id="app_nav">
                                <Nav defaultActiveKey="/" className="flex-column" onSelect={signOut}>
                                    <Nav.Link id="menu-logo"><Link to="/"><img src={logo} alt="Logo"/></Link></Nav.Link>
                                    <div className="admin-links">
                                        <Nav.Link><Link to="/my-account"><FontAwesomeIcon icon={faUserEdit}/> My Account</Link></Nav.Link>
                                        {
                                            role === 'admin' || viewSettings ?
                                            (
                                                <Nav.Link><Link to="/settings"><FontAwesomeIcon icon={faCog}/> Settings</Link></Nav.Link>
                                            ) : ''
                                        }
                                    </div>
                                    <span></span>
                                    <div className="main-links">
                                        <Nav.Link><Link to="/inventory"><FontAwesomeIcon
                                            icon={faListAlt}/> Inventory</Link></Nav.Link>
                                        {
                                            role === 'admin' || viewSettings ?
                                            (
                                                <Nav.Link><Link to="/order"><FontAwesomeIcon icon={faTruck}/> Order
                                                    Inventory</Link></Nav.Link>
                                            ) : ''
                                        }
                                        <Nav.Link><Link to="/analytics"><FontAwesomeIcon
                                            icon={faChartBar}/> Analytics</Link></Nav.Link>
                                    </div>
                                    <span></span>
                                    <div className="bottom-nav">
                                        <Nav.Link eventKey="/logout"><FontAwesomeIcon icon={faSignOutAlt}/> Sign
                                            Out</Nav.Link>
                                        <Nav.Link><Link to="/support"><FontAwesomeIcon icon={faHeadset}/> Contact
                                            Support</Link></Nav.Link>
                                    </div>
                                </Nav>
                            </div>
                        </div>
                        <div id="top-nav">
                            <div className="navDropDown">
                                <TopNav/>
                            </div>
                            <div id="top-notification">
                                <TopNotifications/>
                            </div>
                        </div>
                        <div className="main-body">
                            <Container style={app_style.containerStyle}>
                                <Switch>
                                    <Route exact path="/" component={Portal}/>
                                    <Route exact path="/inventory" component={Inventory}/>
                                    {role === 'admin' ? (
                                        <Route exact path="/inventory/setup" component={InventorySetUp}/>) : '' }
                                    {role === 'admin' || addMappings ? (
                                        <Route exact path="/inventory/settings" component={InventorySettings}/>) : ''}
                                    <Route exact path="/my-account" component={MyAccount}/>
                                    <Route exact path="/my-account/update-password" component={UpdatePassword}/>
                                    {role === 'admin' ? (<Route exact path="/order" component={Order}/>) : ''}
                                    <Route exact path="/analytics" component={Analytics}/>
                                    <Route exact path="/support" component={Support}/>
                                    {role === 'admin' || viewSettings ? (
                                        <Route exact path="/settings" component={Settings}/>): '' }
                                    {role === 'admin' || viewSettings ? (
                                        <Route exact path="/settings/users/add" component={AddUser}/>) : '' }
                                    {role === 'admin' || viewSettings ? (
                                        <Route exact path="/settings/users/edit" component={EditUsers}/>) : '' }
                                    {role === 'admin' || viewSettings ? (
                                        <Route exact path="/settings/admins/edit" component={EditAdmins}/>) : '' }
                                    {role === 'admin' || viewSettings ? (
                                        <Route exact path="/settings/practice/edit" component={EditPortal}/>): '' }
                                    <Route exact path="/notifications" component={Notifications}/>
                                    <Route render={() => <Redirect to="/"/>}/>
                                </Switch>
                            </Container>
                        </div>
                    </Router>
                </div>
            );
        } else {
            document.body.style.backgroundColor = app_style.loggoutOutbackground.backgroundColor;
                return (
                    <div>
                        <LoadingBar color="#fff" progress={progress}/>
                        <Container style={homepage_style.containerStyle}>
                            <Row>
                                <img src={logo} alt="Logo" style={homepage_style.logoStyle}/>
                            </Row>
                        </Container>
                    </div>
                )
            }

    }
    else {
        document.body.style.backgroundColor = app_style.loggoutOutbackground.backgroundColor;
        if (state.auth.isLoggingIn || state.auth.isVerifying || state.auth.isLoggingOut) {
            return (
                <div>
                    <LoadingBar color="#fff" progress={progress}/>
                    <Container style={homepage_style.containerStyle}>
                        <Row>
                            <img src={logo} alt="Logo" style={homepage_style.logoStyle}/>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/reset-password" component={ResetPassword}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                    </Switch>
                </Router>
            );
        }
    }
}

export default App