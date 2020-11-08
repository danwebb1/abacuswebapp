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
import {db} from "../config/firebase";
import Alert from "react-bootstrap/Alert";


const MyAccount = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [alert, setAlert] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [website, setWebsite] = useState("");
    const [stateKey, setStateKey] = useState("")
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    let app_state = useSelector(state => state);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user && app_state.user.user_profile.hasOwnProperty('first_name')) {
             setUser(app_state.user.user_profile);
             if(firstName === "") {
                 setFirstName(app_state.user.user_profile.first_name);
                 setLastName(app_state.user.user_profile.last_name);
                 setPhone(app_state.user.user_profile.phone);
                 setEmail(app_state.user.user_profile.email);
                 setAddress1(app_state.user.user_profile.address1);
                 setAddress2(app_state.user.user_profile.address2);
                 setCity(app_state.user.user_profile.city);
                 setState(app_state.user.user_profile.state);
                 setZip(app_state.user.user_profile.zip);
                 setWebsite(app_state.user.user_profile.website);
             }
           }
    }, );

        function handler() {
            let userObject = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                website: website,
                password: password,
                password2: password2,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zip: zip
            };

            const ref = db.collection('users').doc(app_state.user.user_profile.uid);
            ref.update(userObject);
            setAlert(true)
        }

      const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "first_name") {
           setFirstName(value);
        }
        else if (name === "last_name") {
          setLastName(value);
        }
        else if (name === "email") {
          setEmail(value);
        }
        else if (name === "phone") {
          setPhone(value);
        }
        else if (name === "website") {
          setWebsite(value);
        }
        else if (name === "password") {
          setPassword(value);
        }
        else if (name === "password2") {
            setPassword2(value);
        }
        else if (name === "address1") {
            setAddress1(value);
        }
        else if (name === "address2") {
            setAddress2(value);
        }
        else if (name === "city") {
            setCity(value);
        }
        else if (name === "state") {
            setState(value);
        }
        else if (name === "zip") {
            setZip(value);
        }
      };

    if(user.hasOwnProperty('first_name')) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>My Account</Breadcrumb.Item>
                </Breadcrumb>
                <span className="card-prefix"><Link to={`/my-account/update-password`}><FontAwesomeIcon icon={faKey}/> Update Password</Link></span>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faUserEdit}/> My Account</Card.Header>
                    <Card.Body>
                        <Form style={sign_up_style.formStyle}>
                            {
                                    alert && (
                                        <Alert key={1} variant={'success'}>
                                            {email} updated!
                                        </Alert>
                                    )
                                }
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="first_name"
                                            value={firstName}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="last_name"
                                            value={lastName}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder=""
                                            name="email"
                                            value={email}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder=""
                                            name="phone"
                                            value={phone}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpWebsite">
                                        <Form.Label>Website</Form.Label>
                                        <Form.Control
                                            type="website"
                                            placeholder="www.yourdentalsite.com"
                                            name="website"
                                            value={website}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <FontAwesomeIcon icon={faCreditCard} style={sign_up_style.header}/> <span
                                style={sign_up_style.span}>Billing Information</span>
                            </Form.Row>
                            <Form.Group controlid="formSignUpAddress1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="address1"
                                    value={address1}
                                    onChange={event => onChangeHandler(event)}
                                    style={homepage_style.inputStyle}/>
                            </Form.Group>
                            <Form.Row>
                            </Form.Row>
                            <Form.Group controlid="formSignUpAddress2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="address2"
                                    value={address2}
                                    onChange={event => onChangeHandler(event)}
                                    style={homepage_style.inputStyle}
                                />
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="city"
                                            value={city}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="state"
                                            value={state}
                                            style={homepage_style.inputStyle}
                                            onChange={event => onChangeHandler(event)}
                                        >
                                            {
                                                Object.entries(us_states).map(([key, stateName]) => {
                                                    return <option key={key} value={key}>{stateName}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpZip">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="zip"
                                            value={zip}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant="primary" style={homepage_style.button}
                                    onClick={() => handler()}>
                                Save
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
                    <Card.Header><FontAwesomeIcon icon={faUserEdit}/> My Account</Card.Header>
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

export default MyAccount;