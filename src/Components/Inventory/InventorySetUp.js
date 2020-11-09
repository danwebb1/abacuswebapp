import React, {Fragment, useEffect, useState} from "react";
import {sign_up_style} from "../../Styles";
import {homepage_style} from "../../Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListAlt} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link, Redirect, Route} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {getProfile} from "../../actions";
import {useHistory} from "react-router-dom";
import {useInventory} from "../../Utils/hooks/inventory";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {dental_code} from "./dental_codes";
import TextField from "@material-ui/core/TextField";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {submitInitialInventory} from "../../Utils/crudFunction";

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
            console.log(app_state)
             console.log(app_state.user.user_profile.portal.id)
           }
    }, );
    const handleInputChange = (index, event) => {
        const { name, value } = event.currentTarget;
        const values = [...inputFields];
        if (name === "item") {
          values[index].item = value;
        } else {
          values[index].amount = value;
        }
        setInputFields(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ item: '', amount: 0 });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    function item_to_name(item){
        for(let i = 0; i < dental_code.length; i++){
            if(item === dental_code[i].item){
                return dental_code[i].name
            }
        }
    }
    function handleSubmit() {
        let payload = JSON.stringify(inputFields);
        const submitted = submitInitialInventory(user.portal.id, app_state.auth.token.i, payload)
        history.push("/inventory")
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
                         <Card variant="success" className="mb-3 card-callout">
                            <Card.Body className="border-success">
                                <Card.Title>
                                    Initial Inventory Supply Set Up
                                </Card.Title>
                                <p>
                                    Use the form below to add the amount of each inventory supply item you currently have in stock as of
                                    right now. Make sure these counts are accurate. Once this set up is complete, Abacus will handle the rest!
                                </p>

                            </Card.Body>
                         </Card>
                        <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                            {
                                    show && (
                                        <Alert key={1} variant={'success'}>
                                        </Alert>
                                    )
                                }
                                {inputFields.map((inputField, index) => (
                                    <Fragment key={`${inputField}~${index}`}>
                                        <Form.Row style={{marginBottom:"1em"}}>
                                        <Col></Col>
                                        <Col>

                                            <OverlayTrigger key='right' placement="top" overlay={
                                                <Tooltip id="overlay-upgrade">
                                                    Select item based on item code or the name of the item. The form value will be the item code.
                                                </Tooltip>
                                            } >
                                                <Autocomplete
                                                      id="combo-box-demo"
                                                      options={dental_code}
                                                      value={inputField.value}
                                                      getOptionLabel={(option) => option.item}
                                                      renderOption={(option) => {return (
                                                          <React.Fragment>
                                                              {item_to_name(option.item)}
                                                          </React.Fragment>
                                                      )}}
                                                      renderInput={(params) => <TextField {...params}
                                                          onBlur={event => handleInputChange(index, event)}
                                                                                          label="Supply item"
                                                                                          variant="outlined"
                                                                                          name="item"
                                                                                          inputProps={{
                                                                                            ...params.inputProps}}/>}
                                                />
                                        </OverlayTrigger>
                                        </Col>
                                        <Col>
                                            <TextField
                                                label="Supply Amount"
                                                variant="outlined"
                                                type="number"
                                                name="amount"
                                                value={inputField.value}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </Col>
                                        <Col>
                                            <div id="add-field">
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
                            <Form.Row style={{marginBottom:"1em"}}>
                                <Col></Col>
                                     <div style={{width:"25%", marginTop:"1em"}}>
                                     <Button variant="primary" style={homepage_style.button}
                                            onClick={handleSubmit}>
                                        Save
                                    </Button>
                                     </div>
                                <Col></Col>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );

};

export default InventorySetUp;