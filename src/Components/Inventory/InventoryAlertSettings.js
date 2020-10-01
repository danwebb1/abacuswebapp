import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faBell} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
const inventory = require('../../dummy.json');

const InventoryAlertSettings = (props) => {

    function editFormatter(cell) {
        return (
            <div><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> {cell}</div>

        );
    }

    const columns = [{
        dataField: 'item',
        text: 'Item ID',
    }, {
       dataField: 'name',
       text: 'Item Name',
    }, {
        dataField: 'quantity',
        text: 'Alert Threshold',
        formatter: editFormatter,
        validator: (newValue, row, column) => {
            if (isNaN(newValue)) {
              return {
                valid: false,
                message: 'Value must be numeric'
              };
            }
            if (newValue < 0) {
              return {
                valid: false,
                message: 'Value cannot be negative'
              };
            }
            return true;
          }
    }];
    function afterSaveCell(oldValue, newValue) {
      console.log('--after save cell--');
      console.log('New Value was apply as');
      console.log(newValue);
      console.log(`and the type is ${typeof newValue}`);
    }


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/inventory">Inventory</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Inventory Alert Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Card.Header><FontAwesomeIcon icon={faBell} /> Inventory Alert Settings <span style={{float:'right'}}></span></Card.Header>
                <Card.Body>
                    <h3>Set Each Inventory Item Quantity Threshold</h3>
                    <p>When your items reach the set threshold, the item will have a yellow indicator throuhout the application and Abacus will send you
                    a noticiation text message and/or email based on your settings.</p>
                    <ToolkitProvider
                       keyField='item'
                       data={ inventory.inventory }
                       columns={ columns }
                       bordered={ false }
                       search
                        >
                         {
                        props => (
                          <div>
                            <BootstrapTable
                              { ...props.baseProps }
                                pagination={ paginationFactory() }
                                cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell }) }
                            />
                          </div>
                        )
                      }
                    </ToolkitProvider>
                </Card.Body>
            </Card>
        </div>
    )
};

export default InventoryAlertSettings;
