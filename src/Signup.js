import React, {useCallback, useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import {sign_up_style} from "./Styles";
import {homepage_style} from "./Styles";
import {us_states} from "./Utils/state_dropdown.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCreditCard} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {Link} from "@reach/router";
import {useDispatch} from "react-redux";
import ValidatorSchema from './Utils/form_validator'
import {SignUpUser} from "./actions";
const logo = '/images/abacus_logo.png';


const SignUp = () => {
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
        const [error, setError] = useState(null);
        const [show, setShow] = useState(false);
        const dispatch = useDispatch();

        function handler() {
            let userObject = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                password: password,
                password2: password2,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zip: zip
            };
            ValidatorSchema.validate(userObject)
                .then(function() {
                    dispatch(SignUpUser(userObject))
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

      function showAlert(){
          if (show) {
              return (
                    <Alert variant='danger' style={sign_up_style.alertStyle} onClose={() => setShow(false)}
                                 dismissible>
                        {error}
                    </Alert>
              );
          }else{
              return <div></div>
          }
      }

    return (
        <div>
            <Link to="/" style={sign_up_style.back_nav}><FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
                <Container style={sign_up_style.containerStyle}>
                    <Row>
                        <img src={logo} alt="Logo" style={sign_up_style.logoStyle}/>
                    </Row>
                    <Row>
                        <h2 style={sign_up_style.h2}>Sign up to become a Subscriber</h2>
                    </Row>
                        <Form style={sign_up_style.formStyle}>
                          <Row>
                              { showAlert() }
                          </Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="first_name"
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
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpPassword">
                                        <Form.Label>Select Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            name="password"
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpConfirmPassword">
                                        <Form.Label>Verify Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            name="password2"
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                           <Form.Row>
                                <FontAwesomeIcon icon={faCreditCard} style={sign_up_style.header}/> <span style={sign_up_style.span}>Billing Information</span>
                            </Form.Row>
                            <Form.Group controlid="formSignUpAddress1">
                                   <Form.Label>Address Line 1</Form.Label>
                                   <Form.Control
                                       type="text"
                                       placeholder=""
                                       name="address1"
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
                                            defaultValue="Choose state..."
                                            style={homepage_style.inputStyle}
                                            onChange={event => onChangeHandler(event)}
                                        >
                                            {
                                                Object.entries(us_states).map(([key, stateName]) => {
                                                   return  <option key={key} value={key}>{stateName}</option>
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
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant="primary" style={homepage_style.button}
                               onClick={ () =>  handler()  }>
                                Subscribe
                            </Button>
                        </Form>
                </Container>
        </div>
    );
};

export default SignUp;