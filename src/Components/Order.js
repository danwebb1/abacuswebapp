 import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from ".././actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListAlt, faLock, faTruck} from "@fortawesome/free-solid-svg-icons";
 import {Link} from "react-router-dom";
 import Card from "react-bootstrap/Card";

const Order = (props) => {
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch();
    let state = useSelector(state => state);
    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(state.auth.user.uid));
           setProfile(true);
        }
    }, [profile]);
    return (
        <Card style={{marginTop: '10em'}}>
            <Card.Header><FontAwesomeIcon icon={faTruck} /> Order Inventory <span style={{float:'right'}}></span></Card.Header>
            <Card.Body>
                <div className="locked" style={{padding: '5rem'}}>
                <FontAwesomeIcon icon={faLock} />
                <br/>
                You are not currently subscribed to use this feature. Click <Link to="/settings">here</Link> to manage subscriptions.
                </div>
            </Card.Body>
        </Card>
    );
};
export default Order;