import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import List from "react-bootstrap/ListGroup";
import {fetchUser, usePortal} from "../../Utils/hooks/UserAuth"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faUserShield, faUsers, faEdit} from '@fortawesome/free-solid-svg-icons'
import {getMessage} from "../../Utils/hooks/Notifications";
import Badge from "react-bootstrap/Badge";
import {Link} from "react-router-dom";


const PortalSettings = () => {
    const portal = usePortal();
    const [adminList, setAdminList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect( () => {
        if(portal.admins){
            async function fetchAdmins(){
                for(let i = 0; i < portal.admins.length; i++){
                    let _admins = await fetchUser(portal.admins[i].id);
                    setAdminList(adminList => [...adminList, _admins.email])
                }
            } fetchAdmins()
        }
    },[portal]);

    useEffect( () => {
        if(portal.users){
            async function fetchUsers(){
                for(let i = 0; i < portal.users.length; i++){
                    let _users= await fetchUser(portal.users[i].id);
                    setUserList(userList => [...userList, _users.email])
                }
            } fetchUsers()
        }
    },[portal]);

    return (
            <>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header><FontAwesomeIcon icon={faBuilding} /> Practice Information</Card.Header>
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
                    <Link to={`/settings/admins/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link></span></Card.Header>
                            <Card.Body>
                                <List id="portal_users">
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
                    <Link to={`/settings/users/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link></span></Card.Header>
                            <Card.Body>
                                <List id="portal_users">
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