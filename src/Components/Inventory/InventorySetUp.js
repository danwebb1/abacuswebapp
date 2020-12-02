import React, {Fragment, useEffect, useState} from "react";
import {sign_up_style} from "../../Styles";
import {homepage_style} from "../../Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faListAlt, faQuestionCircle, faTooth} from "@fortawesome/free-solid-svg-icons";
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import {dental_code} from "./dental_codes";
import TextField from "@material-ui/core/TextField";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {submitInitialInventory, submitUpcMap} from "../../Utils/crudFunction";
import {useUpc} from "../../Utils/hooks/upc";
import Row from "react-bootstrap/Row";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons/faMapMarkedAlt";
import Avatar from "@material-ui/core/Avatar";
import {useInventory} from "../../Utils/hooks/inventory";
import Chip from "@material-ui/core/Chip";
import LinearProgress from '@material-ui/core/LinearProgress';


const InventorySetUp = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState('inventory');
    const dispatch = useDispatch();
    const history = useHistory();
    const inventory = useInventory();
    const upc_codes = useUpc();
    const [activeCode, setActiveCode] = useState('');
    const [displayUpc, setDisplayUpc] = useState([]);
    let app_state = useSelector(state => state);
    const [open, setOpen] = React.useState(false);
    const [upcValue, setUpcValue] = useState([]);

    const [inputFields, setInputFields] = useState(() => {
        if (method === 'inventory') {
            return [{item: '', amount: 0}]
        }
        if (method === 'upc') {
            return [{upc: ''}]
        }
    });
    const [inputFields2, setInputFields2] = useState([{upc: '', item: '', amount:0}]);
    const [mappedItems, setMappedItems] = useState([]);
    const [currentUpc, setCurrentUpc] = useState('');
    const [pending, setPending] = useState(false);


    useEffect( () => {
        if(method === 'inventory'){
            if(!inputFields[0].item){
                setInputFields([{item: '', amount: 0}])
            }
        }else{
            if(!inputFields2[0].upc){
                setInputFields2([{upc: '', item: 0, amount: 0}])
            }
        }
    },[method]);

    useEffect( () => {
        if(app_state.settings) {
            if(app_state.settings.settings.inventorySetUp) {
                setMethod('upc')
            }
            if(app_state.settings.settings.upcMapComplete) {
                //history.push("/inventory")
            }
        }
    },);
    useEffect( () => {
        if(upc_codes) {
            if (upc_codes.codes) {
                setDisplayUpc(upc_codes.codes)
            }
        }
    },[upc_codes]);

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
        const { name, value } = event.currentTarget;
        const values = [...inputFields];
        if (name === "item") {
            values[index].item = value;
        } else {
            values[index].amount = value;
        }
        setInputFields(values);
    };

    const handleInputChange2 = (index, event) => {
        const { name, value } = event.currentTarget;
        const values = [...inputFields2];
        values[index].upc = currentUpc;
        if(name === "item2") {
            values[index].item = value;
        } else {
            values[index].amount = value;
        }
        setInputFields2(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        if(method === 'inventory'){
            values.push({item: '', amount: 0});
        } else{
            values.push({upc: ''});
        }

        setInputFields(values);
    };

    const handleAddFields2 = () => {
        const values = [...inputFields2];
        values.push({upc: '', item: '', amount: 0});
        setInputFields2(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };
    const handleRemoveFields2 = index => {
        const values = [...inputFields2];
        values.splice(index, 1);
        setInputFields2(values);
    };

    function item_to_name(item){
        for(let i = 0; i < dental_code.length; i++){
            if(item === dental_code[i].item){
                return dental_code[i].name
            }
        }
    }

    function item_to_desc(upc){
        for(let i = 0; i < displayUpc.length; i++){
            if(upc === displayUpc[i].upc){
                return upc + " - " + displayUpc[i].desc
            }
        }
    }
    function triggerDialog(index, event, newValue) {
        const {name, value} = event.currentTarget;
        const values = [...inputFields];
        setUpcValue(upcValue => [...upcValue, newValue]);
        setActiveCode(newValue);
        handleClickOpen();
        setCurrentUpc(newValue);
        setInputFields(values);
    }

    const handleClickOpen = () => {
            setOpen(true);
        };
    const handleClose = (index, action) => {
        if (action === 'save'){
            setMappedItems([...mappedItems, inputFields2]);
            setInputFields2([{upc: '', item: '', amount:0}]);
        }
        setOpen(false);
        };

    function getMapped(index) {
        let items = mappedItems[index] ? mappedItems[index] : [];
        let list = items.map((item, _index) => {
             let name = item_to_name(item.item);
            return (
                <Chip
                    id={index + '-' + _index}
                    avatar={<Avatar style={{backgroundColor:"#fff", color:"#191e28",
                            fontWeight:"900"}}>{item.amount}</Avatar>}
                    label={name}
                    color="primary"
                    onDelete={() => removeItem(index, _index) }
                    style={{color:"white", background:"#191e28", marginTop:".5em", marginLeft: ".25em"}}
                />
              )
        });
        return list
    }

     const MyTextField = ({ params, label }) => (
        <TextField {...params} label={label} variant="outlined" />
         );

    function removeItem(index, _index) {
        delete mappedItems[index][_index];
        document.getElementById(index + '-' + _index).remove();
    }

    async function handleSubmit() {
        if(method === 'inventory') {
            setPending(true);
            let payload = JSON.stringify(inputFields);
            let submit_inventory = await submitInitialInventory(user.portal.id, app_state.auth.token.i, payload);
            if (await submit_inventory.status === 200) {
                setPending(false)
                setMethod('upc')
            }if(submit_inventory === 'error'){
                setError('Oops! Something went wrong. Try again. If the problem persists contact support')
            }

        }
        if(method === 'upc') {
            setPending(true);
            let payload = JSON.stringify(mappedItems);
            console.log(mappedItems)
            let submit_upc = await submitUpcMap(user.portal.id, app_state.auth.token.i, payload, 'post');
            if (await submit_upc.status === 200) {
                setPending(false);
                setShow(true);
                history.push("/settings")
            }if(submit_upc === 'error'){
                setError('Oops! Something went wrong. Try again. If the problem persists contact support')
            }

        }

    }
    if (method === 'inventory') {
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
                                    <h1>Record your current inventory</h1>
                                </Card.Title>
                                <p>
                                    Use the form below to add the amount of each inventory supply item you currently
                                    have in stock as of
                                    right now. Make sure these counts are accurate. Once this set up is complete, Abacus
                                    will handle the rest!
                                </p>

                            </Card.Body>
                        </Card>
                        <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                            {
                                pending && (
                                    <LinearProgress style={{backgroundColor: "#3196b2"}}/>
                                )
                            }
                            {
                                show && (
                                    <Alert key={1} variant={'success'}>
                                        Success!
                                    </Alert>
                                )
                            }
                            <Row style={{marginBottom: "1em"}}>
                                        <Col></Col>
                                        <Col><h6><strong>Inventory Item</strong> <OverlayTrigger
                                                                                  placement="right"
                                                                                  overlay={
                                                                                      <Tooltip id={`tooltip-right`}>
                                                                                            Select item based on item code or the name of the item. The form
                                                                                            value will be the item code.
                                                                                        </Tooltip>
                                                                                  }>
                                            <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".75em", verticalAlign: "top"}}/>
                                                                                </OverlayTrigger>
                                        </h6></Col>
                                        <Col><h6><strong># Currently In-Stock</strong> <OverlayTrigger
                                                                                  placement="right"
                                                                                  overlay={
                                                                                      <Tooltip id={`tooltip-right`}>
                                                                                            Select the amount based on the unit of measurement (e.g. 1 item,
                                                                                            1 box, 1 paid etc)
                                                                                        </Tooltip>
                                                                                  }>
                                            <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".75em", verticalAlign: "top"}}/>
                                            </OverlayTrigger>
                                            </h6></Col>
                                        <Col></Col>
                            </Row>
                            {inputFields.map((inputField, index) => (
                                <Fragment key={`${inputField}~${index}`}>
                                    <Form.Row style={{marginBottom: "1em"}}>
                                        <Col></Col>
                                        <Col>
                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={dental_code}
                                                value={inputField.value}
                                                getOptionLabel={(option) => option.item}
                                                renderOption={(option) => {
                                                    return (
                                                        <React.Fragment>
                                                            {item_to_name(option.item)}
                                                        </React.Fragment>
                                                    )
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                                                        onBlur={event => handleInputChange(index, event)}
                                                                                        label="Supply item"
                                                                                        variant="outlined"
                                                                                        name="item"
                                                                                        inputProps={{
                                                                                            ...params.inputProps
                                                                                        }}/>}
                                                />
                                        </Col>
                                        <Col>
                                            <TextField
                                                label="Supply Amount"
                                                variant="outlined"
                                                type="number"
                                                name="amount"
                                                value={inputField.value}
                                                defaultValue="0"
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
                            <Form.Row style={{marginBottom: "1em"}}>
                                <Col></Col>
                                <div style={{width: "25%", marginTop: "1em"}}>
                                    <Button variant="primary" style={homepage_style.button}
                                            onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </div>
                                <Col></Col>
                            </Form.Row>
                        </Form>
                        <ul id="progressbar">
                            <li className="active">Subscribe to Abacus</li>
                            <li>Set up inventory</li>
                            <li>Map UPC to inventory</li>
                        </ul>
                    </Card.Body>
                </Card>
                <link href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" rel="stylesheet" />
            </div>
        );
    }
    if (method === 'upc') {
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
                                    <h1>Map Inventory Items to UPC codes</h1>
                                </Card.Title>
                                <p>
                                    Use the form below to map the inventory items your office needs and uses for
                                    each office procedure represented as a UPC code. Once youre set up, each recorded procedure
                                    will automatically deduct the appropriate amount of inventory from your inventory table
                                </p>

                            </Card.Body>
                        </Card>
                        <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                            {
                                pending && (
                                    <LinearProgress style={{backgroundColor: "#3196b2"}}/>
                                )
                            }
                            {
                                show && (
                                    <Alert key={1} variant={'success'}>
                                        Congrats! You're all set up!
                                    </Alert>
                                )
                            }<Row style={{marginBottom: "1em"}}>
                                        <Col></Col>
                                        <Col><h6><strong>Procedure Code</strong> <OverlayTrigger
                                                                                  placement="right"
                                                                                  overlay={
                                                                                      <Tooltip id={`tooltip-right`}>
                                                                                            Start typing the 5 digit UPC code and select from the auto populating
                                                                                          list below.
                                                                                        </Tooltip>
                                                                                  }>
                                            <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".75em", verticalAlign: "top"}}/>
                                                                                </OverlayTrigger>
                                        </h6></Col>
                                        <Col></Col>
                            </Row>
                            {inputFields.map((inputField, index) => (
                                <Fragment key={`${inputField}~${index}`}>
                                    <Form.Row style={{marginBottom: "1em"}}>
                                        <Col></Col>
                                        <Col><Autocomplete
                                            id="combo-box-demo"
                                            options={displayUpc}
                                            value={upcValue[index]}
                                            onChange={(event, newValue) => {
                                                if(newValue && newValue.upc) {
                                                    triggerDialog(index, event, newValue.upc)
                                                }
                                            }}
                                            getOptionLabel={(option) => option.upc }
                                            renderOption={(option) => {
                                                return (
                                                    <React.Fragment>
                                                        {item_to_desc(option.upc)}
                                                    </React.Fragment>
                                                )
                                            }}
                                            renderInput={(params) => ( <MyTextField params={params} label={"UPC Code"} /> )}
                                        />
                                        </Col>
                                        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                                            <DialogTitle style={{background:"#191e28"}}>
                                                <h3 style={{color:"white"}}><FontAwesomeIcon icon={faMapMarkedAlt} style={{marginRight:".5em"}}/>
                                                 Map Items to <span style={{fontWeight:"bold"}}>{activeCode}</span></h3>
                                            </DialogTitle>
                                            <DialogContent>
                                               <Form style={sign_up_style.formStyle} onSubmit={handleSubmit}>
                                                    <Row style={{marginBottom: "1em"}}>
                                                        <Col xs={4}>
                                                            Item <OverlayTrigger
                                                                                  placement="right"
                                                                                  overlay={
                                                                                      <Tooltip id={`tooltip-right`}>
                                                                                            Select item based on item code or the name of the item. The form
                                                                                            value will be the item code.
                                                                                        </Tooltip>
                                                                                  }>
                                                                            <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".75em", verticalAlign: "top"}}/>
                                                                                </OverlayTrigger>

                                                        </Col>
                                                        <Col xs={5}>
                                                           Items per procedure <OverlayTrigger
                                                                                  placement="right"
                                                                                  overlay={
                                                                                      <Tooltip id={`tooltip-right`}>
                                                                                            Select the amount based on the unit of measurement (e.g. 1 item,
                                                                                            1 box, 1 paid etc)
                                                                                        </Tooltip>
                                                                                  }>
                                                                        <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".75em", verticalAlign: "top"}}/>
                                                                        </OverlayTrigger>

                                                        </Col>
                                                        <Col xs={1}></Col>
                                                </Row>
                                                {inputFields2.map((inputField, index) => (
                                                    <Fragment key={`${inputField}~${index}`}>
                                                        <Form.Row style={{marginBottom: "1em"}}>
                                                         <Col>
                                                            <Autocomplete
                                                                id="combo-box-demo"
                                                                options={dental_code}
                                                                value={inputField.value}
                                                                getOptionLabel={(option) => option.item}
                                                                renderOption={(option) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                            {item_to_name(option.item)}
                                                                        </React.Fragment>
                                                                    )
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                        onBlur={event => handleInputChange2(index, event)}
                                                                                                        label="Supply item"
                                                                                                        variant="outlined"
                                                                                                        name="item2"
                                                                                                        inputProps={{
                                                                                                            ...params.inputProps
                                                                                                        }}/>}
                                                                />
                                                    </Col>
                                                    <Col>
                                                    <TextField
                                                        label="Supply Amount"
                                                        variant="outlined"
                                                        type="number"
                                                        name="amount"
                                                        value={inputField.value}
                                                        defaultValue="0"
                                                        onChange={event => handleInputChange2(index, event)}
                                                    />
                                                </Col>
                                                <Col xs={3}>
                                                    <div id="add-field">
                                                        <Button className="remove" onClick={() => handleRemoveFields2(index)}>
                                                            -
                                                        </Button>
                                                        <Button className="add" onClick={() => handleAddFields2()}>
                                                            +
                                                        </Button>
                                                    </div>
                                                </Col>
                                        </Form.Row>
                                    </Fragment>))}
                                  </Form>
                                            </DialogContent>
                                            <DialogActions>
                                              <Button onClick={() => handleClose(index, 'cancel')} color="primary">
                                                Cancel
                                              </Button>
                                              <Button onClick={ () => handleClose(index, 'save')} color="primary">
                                                Save
                                              </Button>
                                            </DialogActions>
                                          </Dialog>
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
                                    <Form.Row style={{marginBottom: "1em"}}>
                                    <Col></Col>
                                    <Col>

                                        <div style={{display:"flex", justifyContent:"center",flexWrap:"wrap", "& > *": {margin: "0.5"}}}>
                                            {getMapped(index)}
                                        </div>

                                    </Col>
                                    <Col></Col>
                                </Form.Row>
                                </Fragment>))}
                            <Form.Row style={{marginBottom: "1em"}}>
                                <Col></Col>
                                <div style={{width: "25%", marginTop: "1em"}}>
                                    <Button variant="primary" style={homepage_style.button}
                                            onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </div>
                                <Col></Col>
                            </Form.Row>
                        </Form>
                        <ul id="progressbar">
                            <li className="active">Subscribe to Abacus</li>
                            <li className="active" onClick={()=> setMethod('inventory')}>Set up inventory</li>
                            <li className={ show && ( "active" )}>Map UPC to inventory</li>
                        </ul>
                    </Card.Body>
                </Card>
                <style dangerouslySetInnerHTML={{__html: `
                    #select-multiple-native:focus {
                        height: 10em;
                    }
                `}}></style>
                <link href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" rel="stylesheet" />
            </div>
        );
    }
};

export default InventorySetUp;