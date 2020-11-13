import React, {useEffect, useState} from "react";
import {db, Myfirebase, time} from "../../../config/firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faEdit} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import {fetchUser, useAuth, usePortal, useUserProfile} from "../../../Utils/hooks/UserAuth";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import QueryString from "query-string";
import Form from "react-bootstrap/Form";
import {homepage_style, sign_up_style} from "../../../Styles";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";




const EditPortal = () => {
  const state = useSelector(state => state);
  const auth = useAuth();
  const _portal = usePortal();
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(false);
  const user =  useUserProfile();
  const [portal, setPortal] = useState('');


   React.useEffect( () => {
       if (user && user.portal ) {
           setPortal(user.portal.id)
       }
   },[user]);

   useEffect( () => {
        if(_portal.email){
            setDisplayName(state.portal.portal.display_name);
            setEmail(state.portal.portal.email);
            setPhone(state.portal.portal.phone);
        }
    },[_portal]);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "display_name") {
        setDisplayName(value);
    }
    else if (name === "phone") {
        setPhone(value);
    }
    else if (name === "email") {
        setEmail(value);
    }
   };
  function editHandler(portal_id){
      const user = db.collection('portal').doc(portal_id);
      user.update({
          display_name: displayName,
          phone: phone,
          email: email
      });
      setAlert(true)
  }

    if(displayName) {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit Portal Information</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faBuilding}/> Edit Portal Information <span
                            style={{float: 'right'}}></span></Card.Header>
                        <Card.Body>
                              <Form style={sign_up_style.formStyle}>
                                {
                                    alert && (
                                        <Alert key={1} variant={'success'}>
                                            {displayName} updated!
                                        </Alert>
                                    )
                                }
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlid="formSignUpFirstName">
                                            <Form.Label>Display Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                name="display_name"
                                                value={displayName}
                                                onChange={event => onChangeHandler(event)}
                                                style={homepage_style.inputStyle}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Form.Row>
                                  <Form.Row>
                                    <Col>
                                        <Form.Group controlid="formSignUpLastName">
                                            <Form.Label>Email</Form.Label>
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
                                    <Col></Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlid="formSignUpEmail">
                                            <Form.Label>Phone</Form.Label>
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
                                <Col></Col>
                                </Form.Row>

                                <Button variant="primary" style={homepage_style.button}
                                        onClick={() => editHandler(portal)}>
                                    Save
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )
    }else {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Practice Information</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faBuilding}/> Edit Practice Information <span style={{float: 'right'}}></span></Card.Header>
                    <Card.Body>
                        <div className="locked" style={{padding: '5rem'}}>
                        <Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default EditPortal;