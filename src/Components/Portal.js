import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from ".././actions";
import PortalInventoryQuickView from "./DashboardWidgets/PortalInventoryQuickView";
import DashboardAlert from "./DashboardWidgets/DashboardAlert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RecentItems from "./DashboardWidgets/RecentItems";
import {useUpcList} from "../Utils/hooks/UpcList";
import AddProcedures from "./DashboardWidgets/AddProcedures";


const Portal = (props) => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    const upc_list = useUpcList();
    const [passUpc, setPassUpc] = useState([])
    let state = useSelector(state => state);
    useEffect( () => {
        if(upc_list) {
            setPassUpc(upc_list)
        }
    },[upc_list]);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(state.auth.user.uid));
           setProfile(true);
        }

        if(state.user.user_profile && state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(state.user.user_profile)
           }
    }, [profile]);
    return (
        <React.Fragment>
            <DashboardAlert/>
            <AddProcedures/>
            <Row>
                <Col>
                    <RecentItems items={passUpc}/>
                </Col>
                <Col>
                    <PortalInventoryQuickView profile={user}/>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default Portal;