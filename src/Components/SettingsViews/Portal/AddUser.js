import React, {useState} from "react";
import {db, Myfirebase, time} from "../../../config/firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useAuth, useUserProfile} from "../../../Utils/hooks/UserAuth";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link, useLocation, useHistory} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import QueryString from 'query-string'

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const user =  useUserProfile();
  const [portal, setPortal] = useState('');
  const location = useLocation();
  const hash = QueryString.parse(location.hash);
  const user_kind = hash.kind;

   React.useEffect( () => {
       if (user && user.portal ) {
           setPortal(user.portal.id)
       }
   },[user]);


  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
    if (name === "userFirstName") {
      setFirstName(value);
    }
    if (name === "userLastName") {
      setLastName(value);
    }
  };

  function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

  function handler(){
        if(email){
            Myfirebase
                .auth()
                .createUserWithEmailAndPassword(email, uuidv4())
                .then(user => {
                    const _portal = db.collection('portal').doc(portal);
                    Myfirebase
                    .auth().sendPasswordResetEmail(email);
                    db.collection('users')
                      .doc(user.user.uid )
                      .set({first_name: firstName, last_name: lastName, email: email, portal: _portal, uid: user.user.uid}).then(res => {
                          const ref = db.collection('users').doc(user.user.uid);
                          const _portal = db.collection('portal').doc(portal);
                          if(user_kind === 'user')
                             _portal.update({users:  time.arrayUnion(ref)});
                          if(user_kind === 'admin')
                             _portal.update({admins:  time.arrayUnion(ref)});
                        });
                    setEmailHasBeenSent(true)
                }).catch(error => {
                    setError(error)
                })

        }
    }
    return (
        <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Add {user_kind.charAt(0).toUpperCase() + user_kind.slice(1)}</Breadcrumb.Item>
                </Breadcrumb>
                {
                    emailHasBeenSent && (
                        <Alert key={1} variant={'success'}>
                        New portal user has been created
                      </Alert>
                    )
                }
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faPlus} /> Add {user_kind.charAt(0).toUpperCase() + user_kind.slice(1)}<span style={{float:'right'}}></span></Card.Header>
                    <Card.Body>
                        <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="userFirstName" placeholder="" onChange={event => onChangeHandler(event)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlid="formSignUpEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" name="userLastName" placeholder="" onChange={event => onChangeHandler(event)}/>
                                    </Form.Group>
                                </Col>
                        </Form.Row>
                        <Form.Row>
                                <Col>
                                    <Form.Group controlid="formSignUpEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="userEmail" placeholder="" onChange={event => onChangeHandler(event)}/>
                                    </Form.Group>
                                </Col>
                        </Form.Row>
                        <Button variant="primary" type="submit" onClick={ () =>  handler()  }>
                            Submit
                        </Button>
                    </Card.Body>
                </Card>
        </div>
  )
}


export default AddUser;