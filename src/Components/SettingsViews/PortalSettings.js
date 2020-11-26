import React, {useEffect, useState} from "react";
import List from "react-bootstrap/ListGroup";
import {fetchUser, usePortal} from "../../Utils/hooks/UserAuth"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faUserShield, faUsers, faEdit, faPlus, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";


const PortalSettings = () => {
    const portal = usePortal();
    let users = JSON.parse(localStorage.getItem('portalUsers')) ? JSON.parse(localStorage.getItem('portalUsers')) : [];
    let admins = JSON.parse(localStorage.getItem('portalAdmins')) ? JSON.parse(localStorage.getItem('portalAdmins')) : [];
    const [adminList, setAdminList] = useState([]);
    const [userList, setUserList] = useState([]);
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
    return (
            <>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header><FontAwesomeIcon icon={faBuilding} /> Practice Information
                            <span style={{float:'right'}}>
                                <Link to={`/settings/practice/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link></span></Card.Header>
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
                            <Card.Header><FontAwesomeIcon icon={faUserShield} /> Admins<span style={{float:'right'}}>
                                <Link to={`/settings/users/add#kind=admin`}><FontAwesomeIcon icon={faPlus} /> Add</Link>
                                <Link to={`/settings/admins/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link></span></Card.Header>
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
                            <Card.Header><FontAwesomeIcon icon={faUsers} /> Users<span style={{float:'right'}}>
                    <Link to={`/settings/users/add#kind=user`}><FontAwesomeIcon icon={faPlus} /> Add</Link>
                             <Link to={`/settings/users/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link></span></Card.Header>
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

};

export default PortalSettings;