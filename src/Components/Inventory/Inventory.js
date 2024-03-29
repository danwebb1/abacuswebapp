import React, {useState, useEffect} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faCog, faListAlt, faCloudUploadAlt, faKey} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {useInventory} from '../../Utils/hooks/inventory'
import Spinner from "react-bootstrap/Spinner";
import {useSelector} from "react-redux";

const Inventory = () => {
    const _inventory = JSON.parse(localStorage.getItem('abacusInventory')) ? JSON.parse(localStorage.getItem('abacusInventory')) : [{supply:[]}];
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;
    const inventory = useInventory();
    const [displayInventory, setDisplayInventory] = useState(_inventory.supply );
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const state = useSelector(state => state);
    const [setup, setSetUp] = useState(false);
    useEffect( () => {
        if(state.settings) {
            if(!state.settings.settings.inventorySetUp) {
                setSetUp(true)
            }
        }
    },);
    useEffect( () => {
                if (inventory) {
                    if (inventory.supply) {
                        setDisplayInventory(inventory.supply)
                    }
        }
    },);
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

    if (displayInventory){
        if(displayInventory.length > 0) {
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
                    </Breadcrumb>
                    <span className="card-prefix"><Link to={`/inventory/settings`}><FontAwesomeIcon icon={faCog}/> Inventory Settings</Link></span>
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
        }
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

                            <Card variant="success" className="mb-3 card-callout">
                            <Card.Body className="border-success">
                                <Card.Title>
                                </Card.Title>
                                <p>
                                    <button style={{backgroundColor:"#3196b2", borderColor:"#3196b2", display:"block", margin:"0 auto"}}><h3 style={{textAlign:"center", fontWeight:"bold", margin:"1em"}}> <FontAwesomeIcon icon={faCloudUploadAlt} style={{color:"#fff"}}/> <Link to={"/inventory/setup"} style={{textDecoration:"none", color:"#fff"}}>Begin Inventory Set Up</Link></h3></button>
                                </p>

                            </Card.Body>
                         </Card>
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
