import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {Link} from "@reach/router";
import {homepage_style, sign_up_style, reset_pass_style} from "./Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const logo = '/images/abacus_logo.png';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };
    return (
        <div>
            <Link to="/" style={sign_up_style.back_nav}><FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
                <Container style={homepage_style.containerStyle}>
                    <Row>
                        <img src={logo} alt="Logo" style={sign_up_style.logoStyle}/>
                    </Row>
                    <Row>
                        <h2 style={sign_up_style.h2}>Reset Your Password</h2>
                    </Row>
                        <Form style={reset_pass_style.formStyle}>
                            {emailHasBeenSent && (
                            <Row>
                                If your email matches the one we have on file for your account, we have sent you an
                                an email with instructions for resetting your password.
                            </Row>
                            )}
                            {error !== null && (
                                <Row>
                                    {error}
                                </Row>
                            )}
                            <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="" style={homepage_style.inputStyle}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Button variant="primary" type="submit" style={homepage_style.button}>
                                Reset
                            </Button>
                        </Form>
                </Container>
        </div>
  );
};

export default ResetPassword;