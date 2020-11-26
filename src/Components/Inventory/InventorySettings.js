import React, {Fragment, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faMapMarkedAlt, faQuestionCircle, faTooth} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {useInventory} from "../../Utils/hooks/inventory";
import {useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {usePortal, useUserProfile} from "../../Utils/hooks/UserAuth";
import Divider from "@material-ui/core/Divider";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useUpcMap} from "../../Utils/hooks/UpcMap";
import {dental_code} from "./dental_codes";
import { mdiToothbrushElectric } from '@mdi/js';
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Form from "react-bootstrap/Form";
import {sign_up_style} from "../../Styles";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "react-bootstrap/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";

const InventorySettings = (props) => {
    const display_name = localStorage.getItem('portalDisplay') ? localStorage.getItem('portalDisplay') : '';
    const mapped_items = localStorage.getItem('abacusUpcMap') ? localStorage.getItem('abacusUpcMap') : [];
    const inventory = useInventory();
    const portal = usePortal();
    const user =  useUserProfile();
    const upc_map = useUpcMap()
    const state = useSelector(state => state);
    const [upcMap, setUpcMap] = useState(mapped_items)
    const [integration, setIntegration] = useState('');
    const [displayName, setDisplayName] = useState(display_name);

    useEffect( () => {
        if(state.settings) {
            if(state.settings.settings.integration) {
                    setIntegration(state.settings.settings.integration)
                }
            }
    },);

    useEffect( () => {
        if(portal.email){
            console.log(state.portal);
            if(state.portal.portal.display_name) {
                    setDisplayName(state.portal.portal.display_name)
                }
            }
    },[portal]);

    useEffect( () => {
        if(upcMap){
            if(upcMap.upc_map) {
                    setUpcMap(upcMap)
                }
            }
    },[upc_map]);

    function item_to_name(item){
        for(let i = 0; i < dental_code.length; i++){
            if(item === dental_code[i].item){
                return dental_code[i].name
            }
        }
    }
    function getRepeatingNumber(arr){
    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < i; j++) {
            if (arr[i] === arr[j]) {
                return arr[i];
            }
        }
    }
}

    function getMapped(mapped) {
        mapped = JSON.parse(mapped);

        let _upcs = new Set();
        let upcs = mapped.upc_map.forEach((upc) => _upcs.add(upc.upc__upc + " " + upc.upc__desc));
        _upcs = [..._upcs];
        let counts = _upcs.map((upc, index) => {
            return (
                    <Chip
                        variant="outlined"
                        avatar={<Avatar style={{background:"white", color:"#3196b2"}}><FontAwesomeIcon icon={faMapMarkedAlt}/></Avatar>}
                        label={upc}
                        color="primary"
                        style={{color: "white", background: "#3196b2", marginTop: ".5em", marginLeft: ".25em", fontWeight: "700"}}
                    />

            )
        });
        return counts
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/inventory">Inventory</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Inventory Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Card.Body>
                    <div style={{width:"50%"}}>
                        <Row>
                        <h4 className="header-bold spacer"><Avatar style={{display:"inline-flex", background:"#3196b2", marginLeft: ".75em"}}><FontAwesomeIcon icon={faTooth}/></Avatar> {displayName}</h4>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <h4 className="spacer">Integration</h4>
                            </Col>
                            <Col>
                                {integration.length < 1 && (
                                    <h4 className="spacer"><Badge variant="secondary">None</Badge></h4>
                                )}{integration.length > 0 && (
                                    <h4 className="spacer"><Badge variant="success">{integration}</Badge></h4>
                                )}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <h4 className="spacer">UPC Maps</h4>
                            </Col>
                            <Col>
                                { getMapped(upcMap)}
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

export default InventorySettings;
