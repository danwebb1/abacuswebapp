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
            if (column === 'lastUsed')
                column_val = '9/27/2020';
            if (column === 'nextUse')
                column_val = <FontAwesomeIcon icon={faLock} />
        }
        if (inventorySet === 'warning') {
            if (column === 'id')
                column_val = '1043977';
            if (column === 'name')
                column_val = 'Angle';
            if (column === 'qty')
                column_val = '0';
            if (column === 'lastUsed')
                column_val = '9/27/2020';
            if (column === 'nextUse')
                column_val = <FontAwesomeIcon icon={faLock} />
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
                <th>Last Used</th>
                <th>Next Scheduled Use</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{itemGet('id')}</td>
                    <td>{itemGet('name')}</td>
                    <td>{itemGet('qty')}</td>
                    <td>{itemGet('lastUsed')}</td>
                    <td className="premium-element">
                    <OverlayTrigger key='right' placement="right" overlay={
                        <Tooltip id="overlay-upgrade" {...props}>
                            Upgrade for appointment schedule integration
                        </Tooltip>
                    } >
                        {itemGet('nextUse')}
                    </OverlayTrigger>
                    </td>
                </tr>
            </tbody>
          </Table>
        </div>
    )
};

export default InventoryQuickViewTableView ;