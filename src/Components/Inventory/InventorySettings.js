import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faTooth} from "@fortawesome/free-solid-svg-icons";
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

const InventorySettings = (props) => {
    const display_name = localStorage.getItem('portalDisplay') ? localStorage.getItem('portalDisplay') : ''
    const inventory = useInventory();
    const portal = usePortal();
    const user =  useUserProfile();
    const state = useSelector(state => state);
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
    /*
    const getMapped = (index) => {
        let items = mappedItems[index] ? mappedItems[index] : [];
        let list = items.map((item, _index) => {
             let name = item_to_name(item.item);
            return (
                <Chip
                    id={index + '-' + _index}
                    avatar={<Avatar style={{backgroundColor:"#fff", color:"#191e28",
                            fontWeight:"900"}}>{item.amount}</Avatar>}
                    label={name}
                    color="primary"
                    onDelete={() => removeItem(index, _index) }
                    style={{color:"white", background:"#191e28", marginTop:".5em", marginLeft: ".25em"}}
                />
              )
        });
        return list
    }*/

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
                                <h4 className="spacer">test</h4>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

export default InventorySettings;
