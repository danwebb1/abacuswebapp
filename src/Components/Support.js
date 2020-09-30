import React, {useEffect, useState} from "react";
import {sign_up_style} from ".././Styles";
import {homepage_style} from ".././Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {getProfile, SubmitSupportForm} from "../actions";
import Spinner from "react-bootstrap/Spinner";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";


const Support = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [method, setMethod] = useState("");
    const [success, setSuccess] = useState(false);
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
               setEmail(app_state.user.user_profile.email)
               setPhone(app_state.user.user_profile.phone)
           }
    }, );

    useEffect( () => {
        if(app_state.support.supportFormSubmitError){
            setError(app_state.support.supportFormSubmitError)
        }
        if(app_state.support.supportFormSubmitSuccess){
            setSuccess(true)
        }
    },);


    function showAlert(){
        console.log(success)
          if (error) {
              return (
                  <Alert variant='danger' style={sign_up_style.alertStyle} onClose={() => setError(false)}
                         dismissible>
                      {error}
                  </Alert>
              );
          }else if(success) {
              return(
                   <Alert variant='success' style={sign_up_style.alertStyle} onClose={() => setSuccess(false)}
                         dismissible>
                      Your support request has been sent. Someone will be in touch with you as soon as possible.
                  </Alert>
              );
          }else{
              return <div></div>
          }
      };
        function handler() {
            let date = new Date();
            let supportObject = {
                user: user.uid,
                phone: phone,
                email: email,
                message: message,
                preferred_respond_method: method,
                created_date: date
            };

            dispatch(SubmitSupportForm(supportObject))
        }

      const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "contactEmail") {
             setEmail(value);
             console.log(value)
        }
        else if (name === "contactPhone") {
            setPhone(value);
            console.log(value)
        }
        else if (name === "contactMessage") {
            setMessage(value);
            console.log(value)
        }
        else if (name === "respondPreference") {
            setMethod(value);
            console.log(value)
        }
      };

    if(user.hasOwnProperty('first_name')) {
        return (
            <div>
                {showAlert()}
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Contact Support</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faHeadset}/> Contact Support</Card.Header>
                    <Card.Body>
                        <Form style={sign_up_style.formStyle}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSupportEmail">
                                        <Form.Label>Your Contact Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="contactEmail"
                                            value={user.email}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSupportPhone">
                                        <Form.Label>Your Contact Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="contactPhone"
                                            value={user.phone}
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                                <Form.Group controlid="formSupportPhone">
                                        <Form.Label>What is your issue? (Be as descriptive as possible!)</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="contactMessage"
                                            onChange={event => onChangeHandler(event)}
                                            style={homepage_style.inputStyle}
                                        />
                                </Form.Group>
                              <fieldset>
                                <Form.Group as={"row"}>
                                  <Form.Label as="legend" column sm={6}>
                                    My preferred contact method
                                  </Form.Label>
                                  <Col sm={10} style={{marginBottom: '2em'}}>
                                    <Form.Check
                                      type="radio"
                                      label="Email"
                                      name="respondPreference"
                                      value="email"
                                      onChange={event => onChangeHandler(event)}
                                      id="responseEmailRadio"
                                    />
                                    <Form.Check
                                      type="radio"
                                      label="Phone"
                                      name="respondPreference"
                                      value="phone"
                                      onChange={event => onChangeHandler(event)}
                                      id="responsePhoneRadio"
                                    />
                                  </Col>
                                </Form.Group>
                              </fieldset>
                            <Button variant="primary" style={homepage_style.button}
                                    onClick={() => handler()}>
                                    Send
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
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Contact Support</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faHeadset}/> Contact Support</Card.Header>
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

export default Support;