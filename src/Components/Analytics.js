 import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from ".././actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChartBar} from "@fortawesome/free-solid-svg-icons";
 import Card from "react-bootstrap/Card";
 import Spinner from "react-bootstrap/Spinner";

const Analytics = (props) => {
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
            <Card.Header><FontAwesomeIcon icon={faChartBar} /> Analytics Dashboard </Card.Header>
            <Card.Body>
                <div className="locked" style={{padding: '5rem'}}>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
                <h3>There is currently not enough data usage for us to show you how you use your inventory. Check back soon!</h3>
                </div>
            </Card.Body>
        </Card>
    );
};
export default Analytics;