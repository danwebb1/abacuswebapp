import React, {Fragment, useEffect, useState} from "react";
import {sign_up_style} from "../../Styles";
import {homepage_style} from "../../Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListAlt, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {getProfile} from "../../actions";
import {useHistory} from "react-router-dom";
import {useInventory} from "../../Utils/hooks/inventory";
import ScriptTag from 'react-script-tag';


const InventorySetUp = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    let app_state = useSelector(state => state);
    const inventory = useInventory();

    const [inputFields, setInputFields] = useState([
       { item: '', amount: 0 }
    ]);

    useEffect( () => {
        if(app_state.settings) {
            if(app_state.settings.settings.inventorySetUp) {
                history.push("/inventory")
            }
        }
    },);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user && app_state.user.user_profile.hasOwnProperty('first_name')) {
             setUser(app_state.user.user_profile);

           }
    }, );

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "item") {
          values[index].item = event.target.value;
        } else {
          values[index].amount = event.target.value;
        }

        setInputFields(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ item: '', amount: 0 });
        setInputFields(values);
        let script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = '/js/autocomplete.js';
        script.id = 'ac_script';
        document.getElementById("ac_script").remove()
        document.body.appendChild(script)
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };


    function handleSubmit() {

    }
    return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/inventory">Inventory</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Inventory Set Up</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListAlt}/> Inventory Set Up</Card.Header>
                    <Card.Body>
                        <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                            {
                                    show && (
                                        <Alert key={1} variant={'success'}>
                                        </Alert>
                                    )
                                }
                                {inputFields.map((inputField, index) => (
                                    <Fragment key={`${inputField}~${index}`}>
                                        <Form.Row>
                                        <Col></Col>
                                        <Col>
                                        <Form.Group controlid="formSignUpFirstName">
                                            <Form.Label>Item</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id={`autoComplete`}
                                                className={`autoComplete${index}`}
                                                placeholder="Start typing item by ID or name"
                                                name="item"
                                                value={inputField.item}
                                                onChange={event => handleInputChange(index, event)}
                                                style={homepage_style.inputStyle}
                                            />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlid="formSignUpLastName">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    name="amount"
                                                    value={inputField.amount}
                                                    onChange={event => handleInputChange(index, event)}
                                                    style={homepage_style.inputStyle}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <div id="add-field" style={{marginTop:"1.5em"}}>
                                                <Button className="remove" onClick={() => handleRemoveFields(index)}>
                                                  -
                                                </Button>
                                                <Button className="add" onClick={() => handleAddFields()}>
                                                  +
                                                </Button>
                                            </div>
                                        </Col>
                                        </Form.Row>
                                    </Fragment>))}
                            <Form.Row>
                                <Col></Col>
                                     <div style={{width:"25%"}}>
                                     <Button variant="primary" style={homepage_style.button}
                                            onSubmit={handleSubmit}>
                                        Save
                                    </Button>
                                     </div>
                                <Col></Col>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
                <ScriptTag type="text/javascript" src="/inventory/dental_codes.json" />
                <ScriptTag type="text/javascript" src="/js/autocomplete.js" id="ac_script"/>
            </div>
        );

};

export default InventorySetUp;