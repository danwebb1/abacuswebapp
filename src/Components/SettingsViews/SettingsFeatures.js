import React, {useState} from "react"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import {settings_card_styles} from "../../Styles.js"
import Toggle from '../Utils/Toggle'
const SettingsFeatures = () => {

    const [defaultActive, setDefaultActive] = useState(true);
    const [orderActive, setOrderActive] = useState(false);
    const [analyticsActive, setAnalyticsActive] = useState(false);
    const [forecastActive, setForecastActive] = useState(false);

    const iconContext = (status) => {
        if(status){
            return <FontAwesomeIcon className="feature active" icon={faCheckCircle}/>
        }else{
            return <FontAwesomeIcon className="feature inactive" icon={faTimesCircle}/>
        }
    };

    const onToggle = (event) => {
        const { name, value } = event.currentTarget;
        if(name === 'default' && value === "true"){
            const prompt = window.prompt('Are you sure you want to cancel your subscription? All Abacus Dental features will be disabled immediately! to confirm, type "Quit Abacus" below');
            if(prompt === 'Delete Abacus'){
                setDefaultActive(false);
                setOrderActive(false);
                setAnalyticsActive(false);
                setForecastActive(false);
            }
        }
        if(name === 'ordering'){
            if(value === 'false'){
                setOrderActive(true);
            }else{
                setOrderActive(false)
            }
        }
        if(name === 'analytics'){
            if(value === 'false'){
                setAnalyticsActive(true);
            }else{
                setAnalyticsActive(false)
            }
        }
        if(name === 'forecast'){
            if(value === 'false'){
                setForecastActive(true);
            }else{
                setForecastActive(false)
            }
        }
    };


    return (
        <>
            <Row>
            </Row>
            <form>
            <Row>
                <Col>
                    <Card style={{border:"none"}}>
                        <Card.Body style={settings_card_styles.card}>
                            <h3 style={{marginBottom:"1em"}}>Inventory Management</h3>
                            <ListGroup className="settingsList">
                              <ListGroup.Item><p>Accurate, Up-to-Date, Status of Your Inventory</p>{iconContext(defaultActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Seamless Integration With Top Practice Management Platforms</p>{iconContext(defaultActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Create Custom Alerts to Notify You When Your Supplies Are Low</p>{iconContext(defaultActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Snapshot View of Your Inventory History Each Day</p>{iconContext(defaultActive)}</ListGroup.Item>
                            </ListGroup>
                            <hr/>
                            <strong style={{verticalAlign:"middle"}}>Status</strong>
                            <Toggle
                                name="default"
                                value={defaultActive}
                                checked={defaultActive}
                                onToggle={onToggle}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{border:"none"}}>
                        <Card.Body style={settings_card_styles.card}>
                        <h3 style={{marginBottom:"1em"}}>Online Ordering</h3>
                        <ListGroup className="settingsList">
                              <ListGroup.Item><p>Order Inventory From Top Suppliers</p>{iconContext(orderActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Setup Automatic, Just in Time Ordering</p>{iconContext(orderActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Track Your Orders</p>{iconContext(orderActive)}</ListGroup.Item>
                              <ListGroup.Item><p>View Your Inventory Costs In One Convenient Location</p>{iconContext(orderActive)}</ListGroup.Item>
                            </ListGroup>
                            <strong style={{verticalAlign:"middle"}}>Status</strong>
                            <Toggle
                                name="ordering"
                                value={orderActive}
                                checked={orderActive}
                                onToggle={onToggle}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                 <Col>
                    <Card style={{border:"none"}}>
                        <Card.Body style={settings_card_styles.card}>
                            <h3 style={{marginBottom:"1em"}}> Analytics</h3>
                            <ListGroup className="settingsList">
                              <ListGroup.Item><p>Access to Data Driven Insight of Your Practice's Inventory Costs</p>{iconContext(analyticsActive)}</ListGroup.Item>
                              <ListGroup.Item><p>See Seasonal Trends to Help Budget and Plan More Effectively</p>{iconContext(analyticsActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Streamline Your Practice's Business Operations</p>{iconContext(analyticsActive)}</ListGroup.Item>
                            </ListGroup>
                            <strong style={{verticalAlign:"middle"}}>Status</strong>
                            <Toggle
                                name="analytics"
                                value={analyticsActive}
                                checked={analyticsActive}
                                onToggle={onToggle}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{border:"none"}}>
                        <Card.Body style={settings_card_styles.card}>
                            <h3 style={{marginBottom:"1em"}}>Smart Forecasting</h3>
                            <ListGroup className="settingsList">
                              <ListGroup.Item><p>Integrate With Your Practive Management System to Predict Inventory Needs</p>{iconContext(forecastActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Reduce Costs By Not Purchasing More Than You'll Need</p>{iconContext(forecastActive)}</ListGroup.Item>
                              <ListGroup.Item><p>Reduce Costs and Save Time So You Can Focus on More Important Matters</p>{iconContext(forecastActive)}</ListGroup.Item>
                            </ListGroup>
                            <strong style={{verticalAlign:"middle"}}>Status</strong>
                            <Toggle
                                name="forecast"
                                value={forecastActive}
                                checked={forecastActive}
                                onToggle={onToggle}
                            />
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
            </form>
        </>
    );
};
export default SettingsFeatures;