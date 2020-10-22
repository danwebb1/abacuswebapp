import React, {useState, useCallback, useEffect} from "react";
import { Link } from '@reach/router';
import {useDispatch, useSelector} from "react-redux";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { homepage_style } from './Styles.js';
import { loginUser } from "./actions";
import './App.css'
import Alert from "react-bootstrap/Alert";
import {sign_up_style} from "./Styles";
const logo = '/images/abacus_logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    let state = useSelector(state => state);

   const handler = useCallback (() =>{
        dispatch(loginUser(email,password))
    }, [password]);

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
          if(name === 'email') {
              setEmail(value);
          }
          else if(name === 'password'){
            setPassword(value);
          }
      };

    useEffect( () =>{
        if(state.auth.loginError){
            setError(state.auth.error.message);
        }
    },[error]);

    function showAlert(){
          if (error) {
              return (
                    <Alert variant='danger' style={sign_up_style.alertStyle} >
                        {error}
                    </Alert>
              );
          }else{
              return <div></div>
          }
      }

    return (
                <Container style={homepage_style.containerStyle}>
                    {showAlert()}
                    <Row id="login-logo">
                        <img src={logo} alt="Logo" style={homepage_style.logoStyle}/>
                    </Row>
                    <Row>
                        <h2 className="login-form" style={homepage_style.h2Style}>Provider Login</h2>
                    </Row>
                    <Row>
                        <Form style={homepage_style.formStyle} className="login-form">
                            <Form.Group controlid="formLoginEmail">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="emailSymbol">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="email" placeholder="Email/Username"
                                                  aria-label="email/username"
                                                  aria-describedby="email/username"
                                                  name="email"
                                                  onChange={event => onChangeHandler(event)}
                                                  style={homepage_style.inputStyle}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlid="formBasicPassword">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="passwordSymbol"><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                <Form.Control type="password" placeholder="Password"
                                              aria-label="password"
                                              aria-describedby="password"
                                              name="password"
                                              onChange={event => onChangeHandler(event)}
                                              style={homepage_style.inputStyle}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" style={homepage_style.button}
                                onClick={ handler }
                            >
                                Log In
                            </Button>
                                <Form.Text className="text-muted">
                                    <a href="/reset-password" style={homepage_style.link}>Forgot Your Password?</a>
                                </Form.Text>
                        </Form>
                    </Row>
                    <Row>
                        <h5 style={homepage_style.h5Style} className="login-form"><a href="/sign-up" style={homepage_style.signUpLink}>Don't have an account? Sign Up!</a></h5>
                    </Row>
                </Container>

    );
};


export default Login;