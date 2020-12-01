import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {faListAlt, faEllipsisH, faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Link,
} from 'react-router-dom';
import InventoryQuickViewTableView from "./InventoryQuickViewTableView";
import {app_style} from "../../Styles";
import Table from "react-bootstrap/Table";
import {useInventory} from "../../Utils/hooks/inventory";
import Spinner from "react-bootstrap/Spinner";


const PortalInventoryQuickView = (props) => {
    const _inventory = JSON.parse(localStorage.getItem('abacusInventory')) ? JSON.parse(localStorage.getItem('abacusInventory')) : [];
    const inventory = useInventory();
    const [displayInventory, setDisplayInventory] = useState(_inventory.supply);
    let caution = 'caution';
    let warning = 'warning';

    useEffect( () => {
        if(!displayInventory){
            if(inventory){
                if(inventory.supply){
                    setDisplayInventory(inventory.supply)
                }
            }
        }
    }, inventory);

    if(displayInventory) {
        return (
            <div>
                <span className="card-prefix"></span>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListAlt}/> Inventory Quick View<span style={{float: 'right'}}>
                        <Link to={`/inventory`}>[<FontAwesomeIcon
                            icon={faEllipsisH}/>] See All</Link></span></Card.Header>
                    <Card.Body>
                        <ListGroup style={{padding: "0"}}>
                            <ListGroup.Item className={caution}>Inventory Items Running Low</ListGroup.Item>
                            <div style={app_style.inventoryQuickViewTable}>
                                <Table responsive="sm" className={`quick-table ${caution}`}>
                                    <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <InventoryQuickViewTableView inventorySet={caution}/>
                                    </tbody>
                                </Table>
                            </div>
                            <ListGroup.Item className={warning}>Inventory Items Out of Stock</ListGroup.Item>
                            <div style={app_style.inventoryQuickViewTable}>
                                <Table responsive="sm" className={`quick-table ${warning}`}>
                                    <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <InventoryQuickViewTableView inventorySet={warning}/>
                                    </tbody>
                                </Table>
                            </div>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        )
    }else{
        return (
              <Card>
                    <Card.Header><FontAwesomeIcon icon={faListAlt}/> Inventory Quick View<span style={{float: 'right'}}>
                        <Link to={`/inventory`}>[<FontAwesomeIcon
                            icon={faEllipsisH}/>] See All</Link></span></Card.Header>
                    <Card.Body>
                        <Spinner animation="border" role="status">
                                              <span className="sr-only">Loading...</span>
                                        </Spinner>
                    </Card.Body>
              </Card>
        )
    }
};

export default PortalInventoryQuickView;