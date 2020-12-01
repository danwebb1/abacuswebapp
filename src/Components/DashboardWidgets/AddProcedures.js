import React, {Fragment, useEffect, useState} from "react";
import {sign_up_style} from "../../Styles";
import {homepage_style} from "../../Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListOl} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import {getProfile} from "../../actions";
import {useHistory} from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {submitUpc} from "../../Utils/crudFunction";
import {useUpc} from "../../Utils/hooks/upc";
import {useUpcMap} from "../../Utils/hooks/UpcMap";

const AddProcedures = () => {
    const _permissions = localStorage.getItem('abacusPermissions') ? localStorage.getItem('abacusPermissions') : false;
    const mapped_items = localStorage.getItem('abacusUpcMap') ? localStorage.getItem('abacusUpcMap') : false;
    const [permissions, setPermissions] = useState(_permissions);
    const [inventoryUpdate, setInventoryUpdate] = useState(false);
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const upc_map = useUpcMap();
    const upc_codes = useUpc()
    const [displayUpc, setDisplayUpc] = useState(JSON.parse(mapped_items));
    const [displayUpcDescs, setDisplayUpcDescs] = useState();
    let app_state = useSelector(state => state);
    const [inputFields, setInputFields] = useState([
       { upc: '', amount: '' }
    ]);

    useEffect(() => {
        if (!profile) {
           dispatch(getProfile(app_state.auth.user.uid));
           setProfile(true);
        }
         if(app_state.user && app_state.user.user_profile.hasOwnProperty('first_name')) {
             setUser(app_state.user.user_profile);
         }
    }, );

    useEffect( () => {
        let _permObj;
        if(permissions){
            if(typeof permissions === 'string') {
                _permObj = JSON.parse(permissions);
            }else{
                _permObj = permissions
            }
            if(user.role !== 'admin') {
                setInventoryUpdate(_permObj.userInventoryUpdate);
            }
        }
    },[_permissions]);

    useEffect( () => {
       if(displayUpc){
           if(displayUpc.upc_map) {
                let _upcs = new Set();
                let upcs = displayUpc.upc_map.forEach((upc) => _upcs.add(upc.upc__upc));
                 _upcs = [..._upcs];
                 setDisplayUpcDescs(displayUpc.upc_map)
                setDisplayUpc(_upcs)
           }
       }else{
           if(upc_map){
               if(upc_map.upc_map){
                   let _upcs = new Set();
                   let upcs = upc_map.upc_map.forEach((upc) => _upcs.add(upc.upc__upc));
                   _upcs = [..._upcs];
                    setDisplayUpc(_upcs)
               }
           }
       }


    }, [upc_map]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.currentTarget;
        const values = [...inputFields];
        if (name === "item") {
          values[index].upc = value;
        }else {
          values[index].amount = value;
        }
        setInputFields(values);
    };
    function item_to_desc(upc){
        for(let i = 0; i < displayUpcDescs.length; i++){
            if(upc === displayUpcDescs[i].upc__upc){
                return upc + " - " + displayUpcDescs[i].upc__desc
            }
        }
    }
    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ upc: '', amount: 0 });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    function handleSubmit() {
        let payload = JSON.stringify(inputFields);
        submitUpc(user.portal.id, app_state.auth.token.i, payload).then(res => {
            if (res === 200) {
                setShow(true)
            }
        }).catch(error => {
            setError(error)
        })
    }
    if(user.role === 'admin' || inventoryUpdate) {
        return (
            <div>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListOl}/> Record Completed Procedures</Card.Header>
                    <Card.Body>
                        { show && (
                         <Alert variant='success' style={sign_up_style.alertStyle} >
                            UPC codes have been submitted!
                        </Alert>
                        )}
                        { error && (
                             <Alert variant='danger' style={sign_up_style.alertStyle} >
                                Oops! Something went wrong! Error: {error}
                            </Alert>
                        )}
                        <Card variant="success" className="mb-3 card-callout">
                            <Card.Body className="border-success">
                                <Card.Title>
                                    Update Your Inventory By Recording the Procedures You Completed
                                </Card.Title>
                                <p>
                                    Use the form below to add the amount of each prodedure you ran since your last
                                    inventory supply update.
                                </p>
                            </Card.Body>
                        </Card>
                        <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                            {inputFields.map((inputField, index) => (
                                <Fragment key={`${inputField}~${index}`}>
                                    <Form.Row style={{marginBottom: "1em"}}>
                                        <Col xs lg="5">
                                            <OverlayTrigger key='right' placement="top" overlay={
                                                <Tooltip id="overlay-upgrade">
                                                    Enter the UPC procedure code for appointments you have completed
                                                </Tooltip>
                                            }>
                                                <Autocomplete
                                                    id="combo-box-demo"
                                                    options={displayUpc}
                                                    value={inputField.value}
                                                    getOptionLabel={(option) => option}
                                                    renderOption={(option) => {
                                                        return (
                                                            <React.Fragment>
                                                                {item_to_desc(option)}
                                                            </React.Fragment>
                                                        )
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                                                        onBlur={event => handleInputChange(index, event)}
                                                                                        label="UPC Code"
                                                                                        variant="outlined"
                                                                                        name="item"
                                                                                        inputProps={{
                                                                                            ...params.inputProps
                                                                                        }}/>}
                                                />
                                            </OverlayTrigger>
                                        </Col>
                                        <Col xs lg="2">
                                            <TextField
                                                label="amount"
                                                variant="outlined"
                                                type="number"
                                                name="amount"
                                                InputProps={{
                                                    inputProps: {
                                                        min: 1
                                                    }
                                                }}
                                                defaultValue="0"
                                                value={inputField.value}
                                                onChange={event => handleInputChange(index, event)}
                                            />
                                        </Col>
                                        <Col xs lg="2">
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
                            <Form.Row style={{marginBottom: "1em"}}>
                                <div style={{width: "25%", marginTop: "1em"}}>
                                    <Button variant="primary" style={homepage_style.button}
                                            onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </div>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }else{
        return <></>
    }
};

export default AddProcedures;