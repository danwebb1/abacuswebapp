import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {app_style} from "../../Styles";
import Tooltip from "react-bootstrap/Tooltip";

const InventoryQuickViewTableView = (props) => {
    const [profile, setProfile] = useState(props.profile);
    const [inventorySet, setInventorySet] = useState(props.inventorySet);

    const itemGet = (column) => {
        let column_val;
        if (inventorySet === 'caution') {
            if (column === 'id')
                column_val = '5700632';
            if (column === 'name')
                column_val = 'Gloves';
            if (column === 'qty')
                column_val = '10';
        }
        if (inventorySet === 'warning') {
            if (column === 'id')
                column_val = '1043977';
            if (column === 'name')
                column_val = 'Angle';
            if (column === 'qty')
                column_val = '0';
        }
        return column_val
    };
    return (
        <div style={app_style.inventoryQuickViewTable}>
          <Table responsive="sm" className="quick-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{itemGet('id')}</td>
                    <td>{itemGet('name')}</td>
                    <td>{itemGet('qty')}</td>
                </tr>
            </tbody>
          </Table>
        </div>
    )
};

export default InventoryQuickViewTableView ;