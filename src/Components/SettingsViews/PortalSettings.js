import React, {useEffect, useState} from "react";
import List from "react-bootstrap/ListGroup";
import {fetchUser, usePortal} from "../../Utils/hooks/UserAuth"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faUserShield, faUsers, faEdit, faPlus, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {getProfile} from "../../actions";
import {useDispatch, useSelector} from "react-redux";


const PortalSettings = () => {
    const _permissions = localStorage.getItem('abacusPermissions') ? localStorage.getItem('abacusPermissions') : false;
    const [permissions, setPermissions] = useState(_permissions);
    const [user, setUser] = useState([]);
    const [viewSettings, setViewSettings] = useState(false);
    const [addUsers, setAddUsers] = useState(false);
    const [profile, setProfile] = useState(false);
    const portal = usePortal();
    let users = JSON.parse(localStorage.getItem('portalUsers')) ? JSON.parse(localStorage.getItem('portalUsers')) : [];
    let admins = JSON.parse(localStorage.getItem('portalAdmins')) ? JSON.parse(localStorage.getItem('portalAdmins')) : [];
    const [adminList, setAdminList] = useState([]);
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch()
    let app_state = useSelector(state => state);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user && app_state.user.user_profile.hasOwnProperty('first_name')) {
             setUser(app_state.user.user_profile);
         }
    }, );

    useEffect( () => {
        let _permObj;
        if(permissions){
            if(typeof permissions === 'string') {
                _permObj = JSON.parse(permissions);
            }else{
                _permObj = permissions
            }
            if(user.role !== 'admin') {
                setViewSettings(_permObj.userViewSettings);
                setAddUsers(_permObj.userAddUsers)
            }
        }
    },[_permissions]);

    useEffect( () => {
        if(admins.admins.length > 0){
            async function fetchAdmins(){
                for(let i = 0; i < admins.admins.length; i++){
                    let _admins = await fetchUser(admins.admins[i]);
                    setAdminList(adminList => [...adminList, _admins.email])
                }
            } fetchAdmins()
        }
    },[]);

    useEffect( () => {
        if(users.users.length > 0 ){
            async function fetchUsers(){
                for(let i = 0; i < users.users.length; i++){
                    let _users= await fetchUser(users.users[i]);
                    setUserList(userList => [...userList, _users.email])
                }
            } fetchUsers()
        }
    },[]);
    if(user.role === 'admin' || (viewSettings && addUsers ) ){
        return (
            <>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header><FontAwesomeIcon icon={faBuilding}/> Practice Information
                                <span style={{float: 'right'}}>
                                    <Link to={`/settings/practice/edit`}><FontAwesomeIcon
                                        icon={faEdit}/> Edit</Link></span></Card.Header>
                            <Card.Body>
                                <List id="portal_data">
                                    <List.Item>Display Name: <span>{portal.display_name}</span></List.Item>
                                    <List.Item>Office Phone: <span>{portal.phone}</span></List.Item>
                                    <List.Item>Contact Email: <span>{portal.email}</span></List.Item>
                                </List>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header><FontAwesomeIcon icon={faUserShield}/> Admins<span style={{float: 'right'}}>
                                    <Link to={`/settings/users/add#kind=admin`}><FontAwesomeIcon
                                        icon={faPlus}/> Add</Link>
                                    <Link to={`/settings/admins/edit`}><FontAwesomeIcon
                                        icon={faEdit}/> Edit</Link></span></Card.Header>
                            <Card.Body>
                                <List className="portal_users">
                                    {
                                        adminList.map(admin => {
                                            return (
                                                <List.Item>{admin}</List.Item>
                                            )
                                        })
                                    }
                                </List>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header><FontAwesomeIcon icon={faUsers}/> Users<span style={{float: 'right'}}>
                        <Link to={`/settings/users/add#kind=user`}><FontAwesomeIcon icon={faPlus}/> Add</Link>
                                 <Link to={`/settings/users/edit`}><FontAwesomeIcon
                                     icon={faEdit}/> Edit</Link></span></Card.Header>
                            <Card.Body>
                                <List className="portal_users">
                                    {
                                        userList.map(user => {
                                            return (
                                                <List.Item>{user}</List.Item>
                                            )
                                        })
                                    }
                                </List>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <></>
                    </Col>
                </Row>

            </>
        );
    }else{
        return <></>
    }

};

export default PortalSettings;