import React, {useEffect, useState} from 'react';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router, Route, Switch, Link, useRouteMatch} from "react-router-dom";
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
import {logoutUser} from "./actions";
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
const logo = '/images/abacus_logo.png';

function App(){
    const [progress, setProgress] = useState(15);
    const [isAuth, setIsAuth] = useState(false);
    let state = useSelector(state => state);
    let dispatch = useDispatch();
    useEffect(() => {
        if (!state.auth.isLoggingOut){
            let _check_auth = state.auth.isAuthenticated;
            setIsAuth(_check_auth)
        }
    }, [state.auth]);

    const signOut = () =>{
        dispatch(logoutUser());
        setIsAuth(false);
        window.location.pathname = '/';
    };
    if(isAuth){

        document.body.style.backgroundColor = app_style.bodyStyle.backgroundColor;
        return (
            <div>
                <Router>
                 <div id="menu">
                    <div id="app_nav" >
                    <Nav defaultActiveKey="/" className="flex-column" onSelect={signOut}>
                        <Nav.Link id="menu-logo"><Link to="/"><img src={logo} alt="Logo" /></Link></Nav.Link>
                        <div className="admin-links">
                            <Nav.Link ><Link to="/my-account"><FontAwesomeIcon icon={faUserEdit} /> My Account</Link></Nav.Link>
                            <Nav.Link  ><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></Nav.Link>
                        </div>
                        <span ></span>
                        <div className="main-links">
                        <Nav.Link  ><Link to="/inventory"><FontAwesomeIcon icon={faListAlt} /> Inventory</Link></Nav.Link>
                        <Nav.Link ><Link to="/order"><FontAwesomeIcon icon={faTruck} /> Order Inventory</Link></Nav.Link>
                        <Nav.Link ><Link to="/analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</Link></Nav.Link>
                        </div>
                        <span ></span>
                        <div className="bottom-nav" >
                            <Nav.Link   eventKey="/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</Nav.Link>
                            <Nav.Link ><Link to="/support"><FontAwesomeIcon icon={faHeadset} /> Contact Support</Link></Nav.Link>
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
                            <Route exact path="/my-account" component={MyAccount} />
                            <Route exact path="/my-account/update-password" component={UpdatePassword}/>
                            <Route exact path="/order" component={Order}/>
                            <Route exact path="/analytics" component={Analytics}/>
                            <Route exact path="/support" component={Support}/>
                            <Route exact path="/settings" component={Settings}/>
                            <Route exact path="/notifications" component={Notifications}/>
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </Container>
                </div>
                </Router>
            </div>
        );
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