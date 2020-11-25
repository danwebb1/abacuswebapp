import React, {useEffect, useState} from "react";
import {db, Myfirebase, time} from "../../../config/firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faEdit, faKey, faPlus, faUserEdit} from "@fortawesome/free-solid-svg-icons";
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




const EditAdmins = () => {
  const auth = useAuth();
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [email, setEmail] = useState(false);
  const [alert, setAlert] = useState(false);
  const user =  useUserProfile();
  const [portal, setPortal] = useState('');
  const state = useSelector(state => state);
  const [adminList, setAdminList] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const hash = QueryString.parse(location.hash);
  const userId = hash.userId;
  console.log(state)

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
                setEmail(_user.email)
            }_fetchUser()
        }
    },[userId]);

   useEffect( () => {
        if(state.portal.portal.admins){
            async function fetchUsers(){
                for(let i = 0; i < state.portal.portal.admins.length; i++){
                    let _users= await fetchUser(state.portal.portal.admins[i].id);
                    setAdminList(adminList => [...adminList, {email:_users.email, id:_users.uid}])
                }
            } fetchUsers()
        }
    },[]);
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
      if(action === 'remove') {
          for(let i = 0; i < state.portal.portal.admins.length; i++ ){
              if(state.portal.portal.admins[i].id === uid){
                  const updated_admins = state.portal.portal.admins.filter(admin => admin.id !== uid);
                  const update_portal = _portal.update({admins: updated_admins});
              }
          }
      }

    }
    if(adminList) {
        if(userId) {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings#eventKey=portal">Settings</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/settings/admins/edit">Edit Admins</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit User</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Admins <span
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
                                                value={userProfile.first_name}
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
                                                value={userProfile.last_name}
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
                                                value={userProfile.email}
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
                        <Breadcrumb.Item active>Edit Admins</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Admins <span
                            style={{float: 'right'}}></span></Card.Header>
                        <Card.Body>
                            <List className="portal_users">
                                {
                                    adminList.map(user => {
                                        return (
                                            <List.Item><span style={{verticalAlign:"middle", fontSize:"20px"}}>{user.email}</span><span style={{float:"right"}}>
                                                <Button variant="primary" onClick={() => history.push(`/settings/admins/edit#userId=${user.id}`)}>Edit</Button>
                                                <Button variant="danger" onClick={() =>handler(user.id,'remove')}>Remove</Button>
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
                    <Breadcrumb.Item active>Edit Admins</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faEdit}/> Edit Admins <span style={{float: 'right'}}></span></Card.Header>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}


export default EditAdmins;