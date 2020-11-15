import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {faListAlt, faEllipsisH, faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Link,
} from 'react-router-dom';
import InventoryQuickViewTableView from "./InventoryQuickViewTableView";


const PortalInventoryQuickView = (props) => {
    const [profile, setProfile] = useState(props.profile);
    let caution = 'caution';
    let warning = 'warning';
    return (
        <div>
            <span className="card-prefix"></span>
            <Card>
                <Card.Header><FontAwesomeIcon icon={faListAlt} /> Inventory Quick View<span style={{float:'right'}}>
                    <Link to={`/inventory`}>[<FontAwesomeIcon icon={faEllipsisH} />] See All</Link></span></Card.Header>
                <Card.Body>
                    <ListGroup style={{padding:"0"}}>
                        <ListGroup.Item className="caution">Inventory Items Running Low</ListGroup.Item>
                            <InventoryQuickViewTableView inventorySet={caution}/>
                        <ListGroup.Item className="warning">Inventory Items Out of Stock</ListGroup.Item>
                            <InventoryQuickViewTableView inventorySet={warning}/>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
};

export default PortalInventoryQuickView;