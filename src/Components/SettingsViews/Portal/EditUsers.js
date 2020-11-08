import React, {useEffect, useState} from "react";
import {db,time} from "../../../config/firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import {fetchUser, useAuth, useUserProfile} from "../../../Utils/hooks/UserAuth";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import List from "react-bootstrap/ListGroup";
import QueryString from "query-string";
import Form from "react-bootstrap/Form";
import {homepage_style, sign_up_style} from "../../../Styles";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


const EditUsers = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState(false)
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const user =  useUserProfile();
  const [portal, setPortal] = useState('');
  const state = useSelector(state => state);
  const [userList, setUserList] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const hash = QueryString.parse(location.hash);
  const userId = hash.userId;


   React.useEffect( () => {
       if (user && user.portal ) {
           setPortal(user.portal.id)
       }
   },[user]);

   useEffect( () => {
        if(userId) {
            async function _fetchUser() {
                let _user = await fetchUser(userId);
                setUserProfile(_user)
                setFirstName(_user.first_name);
                setLastName(_user.last_name);
                setEmail(_user.email);
            }_fetchUser()
        }
    },[userId]);

   useEffect( () => {
        if(state.portal.portal.users){
            async function fetchUsers(){
                for(let i = 0; i < state.portal.portal.users.length; i++){
                    let _users= await fetchUser(state.portal.portal.users[i].id);
                    setUserList(userList => [...userList, {email:_users.email, id:_users.uid}])
                }
            } fetchUsers()
        }
    },[]);

  const onChangeHandler = event =>{
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
   };


  function editHandler(uid){
      const user = db.collection('users').doc(uid);
      user.update({
          first_name: firstName,
          last_name: lastName,
          email: email
      })
      setAlert(true)
   }

  function handler(uid,action){
      const ref = db.collection('users').doc(uid);
      const _portal = db.collection('portal').doc(portal);
      for(let i = 0; i < state.portal.portal.users.length; i++ ) {
          if (state.portal.portal.users[i].id === uid) {
              const updated_users = state.portal.portal.users.filter(user => user.id !== uid);
              if (action === 'remove') {
                  const update_portal = _portal.update({users: updated_users});
                  history.push("/settings#eventKey=portal")
              }
              if(action === 'grant'){
                  state.portal.portal.admins.push(ref);
                  const update_portal = _portal.update({users: updated_users});
                  const update_portal_admin = _portal.update({admins:  state.portal.portal.admins});
                  history.push("/settings#eventKey=portal")
              }
          }
      }
    }
    if(userList) {
        if(userId) {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings/users/edit">Edit Users</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit User</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Users <span
                            style={{float: 'right'}}></span></Card.Header>
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
                                </Form.Row>
                                <Button variant="primary" style={homepage_style.button}
                                        onClick={() => editHandler(userProfile.uid)}>
                                    Save
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            );
        }else {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit Users</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Users <span
                            style={{float: 'right'}}></span></Card.Header>
                        <Card.Body>
                            <List className="portal_users">
                                {
                                    userList.map(user => {
                                        return (
                                            <List.Item><span style={{verticalAlign:"middle", fontSize:"20px"}}>{user.email}</span><span style={{float:"right"}}>
                                                <Button variant="primary" onClick={() => history.push(`/settings/users/edit#userId=${user.id}`)}>Edit</Button>
                                                <Button variant="primary" onClick={() => handler(user.id,'grant')}>Grant Admin</Button>
                                                <Button variant="danger" onClick={() => handler(user.id,'remove')}>Remove</Button>
                                                </span>
                                            </List.Item>
                                        )
                                    })
                                }
                            </List>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }else {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Users</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Users <span style={{float: 'right'}}></span></Card.Header>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default EditUsers;