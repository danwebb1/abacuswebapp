import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faFileInvoiceDollar, faCloud, faUsers} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {getProfile} from "../../actions";
import Spinner from "react-bootstrap/Spinner";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SettingsFeatures from "./SettingsFeatures";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PortalSettings from "./PortalSettings";


const Settings = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [activeKey, setActiveKey] = useState(0);

    const dispatch = useDispatch();

    let app_state = useSelector(state => state);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user && app_state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(app_state.user.user_profile);
           }
    }, );


    if(user.hasOwnProperty('first_name')) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Body>
                        <h4><FontAwesomeIcon icon={faCog}/> Manage Your Account Settings</h4>
                        <Tabs defaultActiveKey="overview">
                            <Tab eventKey="overview" title="Overview">
                            <SettingsFeatures/>
                            </Tab>
                            <Tab eventKey="integrations" title="Practice Management Integrations">
                            </Tab>
                            <Tab eventKey="portal" title="My Practice">
                                <PortalSettings/>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>

            </div>
        );
    }else{
        return (
                <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Body>
                        <h4>Manage Your Account Settings</h4>
                        <Spinner animation="border" role="status" style={{display:'block', margin: '5em auto'}}>
                                 <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Card.Body>
                </Card>
                </div>
        );
    }
};

export default Settings;