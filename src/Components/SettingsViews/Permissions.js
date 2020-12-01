import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Container from "react-bootstrap/Container";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Toggle from "../Utils/Toggle";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {usePortal} from "../../Utils/hooks/UserAuth";
import {updateSettings} from "../../actions";

const Permissions = () => {
    const _permissions = localStorage.getItem('abacusPermissions') ? localStorage.getItem('abacusPermissions') : false;
    const portal = usePortal();
    let state = useSelector(state => state);
    const [permissions, setPermissions] = useState(_permissions);
    const [inventoryUpdate, setInventoryUpdate] = useState(false);
    const [addUsers, setAddUsers] = useState(false);
    const [addMappings, setAddMappings] = useState(false);
    const [viewSettings, setViewSettings] = useState(false);

    useEffect(() => {
        if( !permissions ){
            if(state.settings){
                if(state.settings.settings){
                    const permissionsObj = {
                        userAddMappings: state.settings.settings.userAddMappings,
                        userAddUsers: state.settings.settings.userAddUsers,
                        userInventoryUpdate: state.settings.settings.userInventoryUpdate,
                        userViewSettings: state.settings.settings.userViewSettings
                    };
                    setPermissions(permissionsObj)
                }

            }
        }
    },[permissions]);

    useEffect( () => {
        let _permObj;
        if(permissions){
            if(typeof permissions === 'string') {
                _permObj = JSON.parse(permissions);
            }else{
                _permObj = permissions
            }
            setInventoryUpdate(_permObj.userInventoryUpdate);
            setAddUsers(_permObj.userAddUsers);
            setAddMappings(_permObj.userAddMappings);
            setViewSettings(_permObj.userViewSettings)
        }
    },[_permissions]);

    const handleSwitch = (event) => {
        const { name, value } = event.currentTarget;

        if(name === "inventoryUpdate") {
            if(value === 'false') {
                setInventoryUpdate(true);
                updateSettings(state.settings.settings.id, "userInventoryUpdate", true);
            }
            if(value === 'true'){
                setInventoryUpdate(false);
                updateSettings(state.settings.settings.id, "userInventoryUpdate", false);
            }
        }
        if(name === "addUsers") {
            if(value === 'false') {
                setAddUsers(true);
                updateSettings(state.settings.settings.id, "userAddUsers", true);
            }
            if(value === 'true'){
                setAddUsers(false)
                updateSettings(state.settings.settings.id, "userAddUsers", false);
            }
        }
        if(name === "addMappings") {
            if(value === 'false') {
                setAddMappings(true);
                updateSettings(state.settings.settings.id, "userAddMappings", true);
            }
            if(value === 'true'){
                setAddMappings(false)
                updateSettings(state.settings.settings.id, "userAddMappings", false);
            }
        }
        if(name === "viewSettings") {
            if(value === 'false') {
                setViewSettings(true);
                updateSettings(state.settings.settings.id, "userViewSettings", true);
            }
            if(value === 'true'){
                setViewSettings(false);
                updateSettings(state.settings.settings.id, "userViewSettings", false);
            }
        }
    };

    const Switcher = (props) => {
        return (
                  <Toggle
                      name={props.name}
                      value={props.action}
                      checked={props.action}
                      onToggle={handleSwitch}
                  />
        )
    };

    return (
        <Container>
        <Card>
            <Card.Body>
                <h4 style={{fontWeight: "700"}}><FontAwesomeIcon icon={faEyeSlash}/> Security & Permissions</h4>
                <p style={{marginBottom:"2em"}}>As an Admin or the account owner, you can set permissions for your practices users. Choose which features your non Admin
                users are allowed to view and use.</p>
                <TableContainer component={Paper} style={{width:"60%"}}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{width:"70%", fontSize: "18px", fontWeight:"700", padding:"8px", backgroundColor:"#3196b2", color:"white", border: "2px solid white"}} size="medium">Action</TableCell>
                            <TableCell style={{backgroundColor:"#3196b2", fontSize: "18px", fontWeight:"700", padding:"8px", color:"white", border: "2px solid white"}} size="small">Permission</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                         <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can update inventory
                             <OverlayTrigger placement="right" overlay={
                                 <Tooltip id={`tooltip-right`}>
                                     If you're account is NOT integrated with your practice management software, you will need to designate someone to
                                     update your inventory. Turning this permission on means anyone with a user level account can make those updates.
                                 </Tooltip>}>
                                  <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:"1em", verticalAlign: "top"}}/>
                             </OverlayTrigger>

                             </TableCell>
                             <TableCell><Switcher action={inventoryUpdate} name="inventoryUpdate"/></TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can create new user accounts</TableCell>
                             <TableCell><Switcher action={addUsers} name="addUsers"/></TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can create new UPC mappings</TableCell>
                             <TableCell><Switcher action={addMappings} name="addMappings"/></TableCell>
                         </TableRow>
                         <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can access account settings</TableCell>
                             <TableCell><Switcher action={viewSettings} name="viewSettings"/></TableCell>
                         </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
            </Card.Body>
        </Card>
        </Container>
    )
}
export default Permissions;