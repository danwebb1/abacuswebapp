import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {faEllipsisH, faUserClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Link,
} from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import ListItem from "@material-ui/core/ListItem";


const RecentItems = (props) => {
    const [displayUpc, setDisplayUpc] = useState(false);

     useEffect( () => {
        if(props.items) {
            if (props.items.upc_list) {
                setDisplayUpc(props.items.upc_list)
            }
        }
    },[props.items]);

     if(displayUpc) {
         displayUpc.sort((a, b) => (a.color > b.color) ? 1 : -1)
     }
    return (
        <div>
            <span className="card-prefix"></span>
            <Card>
                <Card.Header><FontAwesomeIcon icon={faUserClock} /> Recent Procedures<span style={{float:'right'}}>
                    <Link to={`/inventory`}>[<FontAwesomeIcon icon={faEllipsisH} />] See All</Link></span></Card.Header>
                <Card.Body>
                    { !displayUpc &&  (
                        <div className="locked" style={{padding: '5rem'}}>
                        <Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>
                    ) }
                    { displayUpc && (
                            displayUpc.slice(0, 5).map(item => {
                                return <ListItem style={{borderLeft: "2px solid #3196b2", marginBottom: ".25rem"}}><strong>{item.upc_id__upc}</strong>-  {item.upc_id__desc} <span style={{marginLeft:"1em"}}>{item.date }</span></ListItem>
                         })
                    ) }
                </Card.Body>
            </Card>
        </div>
    )
};

export default RecentItems;