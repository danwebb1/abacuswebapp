import React, {useEffect, useState} from "react";
import {sign_up_style} from ".././Styles";
import {homepage_style} from ".././Styles";
import {us_states} from ".././Utils/state_dropdown.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faUserEdit, faKey} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import ValidatorSchema from '.././Utils/form_validator'
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {getProfile} from "../actions";
import Spinner from "react-bootstrap/Spinner";
import {Link} from "react-router-dom";


const UpdatePassword = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [show, setShow] = useState("");
    const [error, setError] = useState(false);
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

        function handler() {
            let userObject = {
                password: password,
                password2: password2,
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

        if (name === "password") {
          setPassword(value);
        }
        else if (name === "password2") {
            setPassword2(value);
        }
      };

    if(user.hasOwnProperty('first_name')) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/my-account">My Account</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Update Password</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faKey}/> Update Password</Card.Header>
                    <Card.Body>
                        <Form style={sign_up_style.formStyle}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpFirstName">
                                        <Form.Label>Current Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            name="current_password"
                                            value={user.first_name}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpLastName">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            name="new_password"
                                            value={user.last_name}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant="primary" style={homepage_style.button}
                                    onClick={() => handler()}>
                                    Update
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }else{
        return (
                <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>My Account</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faKey}/> Update Password</Card.Header>
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

export default UpdatePassword;