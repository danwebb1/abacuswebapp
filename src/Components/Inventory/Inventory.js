import React, {useState, useEffect} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faBell, faListAlt,faCalendarDay} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {useInventory} from '../../Utils/hooks/inventory'
import Spinner from "react-bootstrap/Spinner";
import {useSelector} from "react-redux";

const Inventory = () => {

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;
    const inventory = useInventory();
    const [displayInventory, setDisplayInventory] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const state = useSelector(state => state);
    const [setup, setSetUp] = useState(true);
    useEffect( () => {
        if(state.settings) {
            if(!state.settings.settings.inventorySetUp) {
                setSetUp(false)
            }
        }
    },);
    useEffect( () => {
        if(inventory) {
            if (inventory.supply) {
                setDisplayInventory(inventory.supply)
            }
        }
    },[inventory]);
    function sortFormatter(column, cell) {
        if(column.text === 'Item Quantity') {
            return (
                <div> {column.text} <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon></div>
            );
        }else{
           return <div> {column.text} <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon></div>
        }
    }
    function dateFormatter(cell) {
        let date = new Date(cell);
        let date_time = date.toLocaleTimeString('en-US');
            return (
                <div style={{fontSize:'12px', color:"#6c757d"}}> {date.toLocaleDateString(undefined, options)} {date_time} </div>
            );

    }

    const columns = [{
        dataField: 'item_id__item_code',
        text: 'Item ID',
    }, {
       dataField: 'item_id__item_name',
       text: 'Item Name',
       headerFormatter: sortFormatter,
       sort: true
    }, {
        dataField: 'amount',
        text: 'Item Quantity'
    },{
       dataField: 'date',
       text: 'Last Used',
       headerFormatter: sortFormatter, formatter: dateFormatter,
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
    if  (displayInventory.length > 0) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListAlt}/> Inventory <span
                        style={{float: 'right'}}></span></Card.Header>
                    <Card.Body>
                        <ToolkitProvider
                            keyField='item'
                            data={displayInventory}
                            columns={columns}
                            bordered={false}
                            defaultSorted={defaultSorted}
                            exportCSV={{onlyExportSelection: true, exportAll: false}}
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <h4>Search for items</h4>
                                        <SearchBar {...props.searchProps} />
                                        <ClearSearchButton {...props.searchProps} />
                                        <ExportCSVButton style={{float: 'right'}} {...props.csvProps}>Export
                                            CSV</ExportCSVButton>
                                        <hr/>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            selectRow={selectRow}
                                            pagination={paginationFactory()}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </Card.Body>
                </Card>
            </div>
        )
    }else{
        if(!setup) {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Card.Header><FontAwesomeIcon icon={faListAlt}/> Inventory <span
                            style={{float: 'right'}}></span></Card.Header>
                        <Card.Body style={{padding:"5em"}}>
                            <h4 style={{textAlign:"center", fontWeight:"bold"}}><Link to={"/inventory/setup"} style={{textDecoration:"none", color:"#3196b2"}}>Begin Inventory Set Up</Link></h4>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        return (
             <div>
             <Breadcrumb>
                  <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListAlt} /> Inventory <span style={{float:'right'}}></span></Card.Header>
                    <Card.Body>
                        <div className="locked" style={{padding: '5rem'}}>
                        <Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>
                        </Card.Body>
                </Card>
            </div>
        )
    }
};

export default Inventory;
