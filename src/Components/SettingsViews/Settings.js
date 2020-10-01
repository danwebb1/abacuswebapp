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


const Settings = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);

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

        /*function handler() {
            let userObject = {

            };
            ValidatorSchema.validate(userObject)
                .then(function() {
                })
                .catch(function(err) {
                    setError(err.errors);
                    setShow(true);
            });
        }

      const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "first_name") {
          setFirstName(value);
            lastName(value);
        }

      };*/

    if(user.hasOwnProperty('first_name')) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faCog} /> Settings <span style={{float:'right'}}></span></Card.Header>
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                              <Card>
                                <Card.Header style={{backgroundColor: '#3196b2'}}>
                                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    <FontAwesomeIcon icon={faFileInvoiceDollar} /> Manage Features
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                  <Card.Body>[Feature content]</Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            <Card>
                                <Card.Header style={{backgroundColor: '#3196b2'}}>
                                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    <FontAwesomeIcon icon={faCloud} /> Practice Management Integrations
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                  <Card.Body>[API integrations content]</Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            <Card>
                                <Card.Header style={{backgroundColor: '#3196b2'}}>
                                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    <FontAwesomeIcon icon={faUsers} /> User Management
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                  <Card.Body>[User managenent content]</Card.Body>
                                </Accordion.Collapse>
                              </Card>
                        </Accordion>
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
                    <Card.Header><FontAwesomeIcon icon={faCog}/> Settings</Card.Header>
                    <Card.Body>
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