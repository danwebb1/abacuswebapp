import React, {useEffect, useState} from "react";
import {faEnvelope, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {useNotifications, getMessage} from "../Utils/hooks/Notifications";
import Spinner from "react-bootstrap/Spinner";
import {useHistory} from "react-router-dom";
import QueryString from 'query-string'
import {useLocation} from "react-router";
import {useRouteMatch} from "react-router";

const Notifications = () => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const notifications = useNotifications();
    const [displayNotifications, setDisplayNotifications] = useState([]);
    useEffect( () => {
        if(notifications && notifications[0]){
            setDisplayNotifications(notifications)
        }
    },);
    const location = useLocation()
    const hash = QueryString.parse(location.hash);
    const messageKey = hash.message;
    const [message, setMessage] = useState([])
    const [subject, setSubject] = useState(null)
    const [from, setFrom] = useState(null)
    const [date, setDate] = useState(null)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect( () => {
        if(messageKey){
            async function fetchMessage(){
                let _message = await getMessage(messageKey);
                setMessage(_message.message)
                setSubject(_message.subject)
                setFrom(_message.from)
                setDate(_message.date.seconds)
            } fetchMessage()
        }
    },[messageKey]);

    const { SearchBar, ClearSearchButton } = Search;

    function dateFormatterMessage(cell) {
        let date = new Date(cell * 1000);
        let date_time = date.toLocaleTimeString('en-US')
            return (
                <div style={{fontSize:'14px', color:"#fff"}}> {date.toLocaleDateString(undefined, options)} {date_time} </div>
            );

    }
    function dateFormatter(cell) {
        let date = new Date(cell * 1000);
        let date_time = date.toLocaleTimeString('en-US');
        return(
                <div style={{fontSize:'11px', color:"#6c757d"}}> {date.toLocaleDateString(undefined, options)} {date_time} </div>
            );
        };

    const columns = [{
        dataField: 'id',
        text: 'id',
        hidden:true
    },{
        dataField: 'from',
        text: 'From'
    },{
       dataField: 'subject',
       text: 'Subject',
    },{
       dataField: 'date.seconds',
       text: 'Date Received',
       formatter: dateFormatter,
       sort: true
    },{
        dataField: 'read',
        text: 'read',
        hidden: 'true'

        }];
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
    };
    const defaultSorted = [{
      dataField: 'date',
      order: 'desc',
    }];

    const rowEvents = {
        onClick: (e, row) => history.push(`notifications#message=${row.id}`)
    };
    const unreadRowClass = (row) => {
          if (row.read === false) {
                return 'unread-alert'
          }
        };

    if(messageKey){
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/notifications">Notifications</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Message: {messageKey}</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faEnvelopeOpen}/> Subject: {subject} <span style={{float:'right'}}>{dateFormatterMessage(date)}</span></Card.Header>
                    <Card.Body>
                        <h5>From: {from}</h5>
                        <div dangerouslySetInnerHTML={{__html: message}}/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    if(displayNotifications.length > 0) {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Notifications</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faEnvelope}/> Notifications </Card.Header>
                    <Card.Body>
                        <ToolkitProvider
                            keyField='item'
                            data={notifications}
                            columns={columns}
                            bordered={false}
                            defaultSorted={defaultSorted}
                            exportCSV={{onlyExportSelection: true, exportAll: false}}
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <h4>Search for messages</h4>
                                        <SearchBar {...props.searchProps} />
                                        <ClearSearchButton {...props.searchProps} />
                                        <hr/>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            selectRow={selectRow}
                                            pagination={paginationFactory()}
                                            rowClasses={unreadRowClass}
                                            rowEvents={rowEvents}
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
        return(
            <>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Notifications</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faEnvelope}/> Notifications <span style={{float: 'right'}}></span></Card.Header>
                    <Card.Body>
                        <div className="locked" style={{padding: '5rem'}}>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
};

export default Notifications;