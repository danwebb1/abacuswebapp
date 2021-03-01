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
    const _permissions = localStorage.getItem('abacusPermissions') ? localStorage.getItem('abacusPermissions') : false;
    const [permissions, setPermissions] = useState(_permissions);
    const [inventoryUpdate, setInventoryUpdate] = useState(false);
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    const upc_list = useUpcList();
    const [passUpc, setPassUpc] = useState([])
    let state = useSelector(state => state);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(state.auth.user.uid));
           setProfile(true);
        }

        if(state.user.user_profile && state.user.user_profile.hasOwnProperty('first_name')) {
               setUser(state.user.user_profile)
           }
    }, [profile]);

    useEffect( () => {

        let _permObj;
        if(permissions){
            if(typeof permissions === 'string') {
                _permObj = JSON.parse(permissions);
            }else{
                _permObj = permissions
            }
            if(profile.role !== 'admin') {
                setInventoryUpdate(_permObj.userInventoryUpdate);
            }
        }
    },[_permissions]);


    useEffect( () => {
        if(upc_list) {
            setPassUpc(upc_list)
        }
    },[upc_list]);

    if(user.role === 'admin' || (inventoryUpdate && profile)) {
        if (user.role === 'admin' && !user.setUp &&  window.location.pathname !== '/inventory/setup') {
                 window.location.pathname = '/inventory/setup'
        }

        return (
            <React.Fragment>
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
    }if(profile){
        return (
            <React.Fragment>
                <PortalInventoryQuickView profile={user}/>
                <RecentItems items={passUpc}/>
            </React.Fragment>
        )
    }
    else{
        return  <></>
    }
};

export default Portal;