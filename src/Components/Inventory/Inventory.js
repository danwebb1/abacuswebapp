import React, {useState, useEffect} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faBell, faListAlt,faCalendarDay} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
const inventory = require('../../dummy.json');

const Inventory = () => {

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    function sortFormatter(column, colIndex) {
        if(column.text === 'Item Quantity') {
            return (
                <div> {column.text} <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon></div>
            );
        }else{
           return <div> {column.text} <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon></div>
        }
    }

    const columns = [{
        dataField: 'item',
        text: 'Item ID',
    }, {
       dataField: 'name',
       text: 'Item Name',
       headerFormatter: sortFormatter,
       sort: true
    }, {
        dataField: 'quantity',
        text: 'Item Quantity'
        /*
        headerFormatter: sortFormatter,
        formatter: (cell) => {
            if (cell === 0) {
                return <div>{cell} <span className="dot" style={{backgroundColor: "darkred", float: "right"}}></span>
                </div>

            } else if (cell < 11 && cell > 0) {
                return <div>{cell} <span className="dot" style={{backgroundColor: "#ffd500", float: "right"}}></span>
                </div>
            } else {
                return <div>{cell} <span className="dot" style={{backgroundColor: "green", float: "right"}}></span>
                </div>
            }
        },*/
    },{
       dataField: 'last_used',
       text: 'Last Used',
       headerFormatter: sortFormatter,
       sort: true

    }];
    const defaultSorted = [{
      dataField: 'quantity',
      order: 'desc',
    }];

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
    };

    return (
        <div>
         <Breadcrumb>
              <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Card.Header><FontAwesomeIcon icon={faListAlt} /> Inventory <span style={{float:'right'}}></span></Card.Header>
                <Card.Body>
                    <ToolkitProvider
                       keyField='item'
                       data={ inventory.inventory }
                       columns={ columns }
                       bordered={ false }
                       defaultSorted={ defaultSorted}
                       exportCSV={ { onlyExportSelection: true, exportAll: false } }
                       search
                        >
                         {
                        props => (
                          <div>
                            <h4>Search for items</h4>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            <ExportCSVButton style={{float:'right'}} { ...props.csvProps }>Export CSV</ExportCSVButton>
                            <hr />
                            <BootstrapTable
                              { ...props.baseProps }
                                selectRow={ selectRow }
                                pagination={ paginationFactory() }
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

export default Inventory;
