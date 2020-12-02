import React, {Fragment, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faCog, faEdit, faMapMarkedAlt, faQuestionCircle, faTooth} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {useInventory} from "../../Utils/hooks/inventory";
import {useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {usePortal, useUserProfile} from "../../Utils/hooks/UserAuth";
import Divider from "@material-ui/core/Divider";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useUpcMap} from "../../Utils/hooks/UpcMap";
import {dental_code} from "./dental_codes";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Form from "react-bootstrap/Form";
import {sign_up_style} from "../../Styles";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "react-bootstrap/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons/faFolderPlus";
import {updateSettings} from "../../actions";
import {submitUpcMap} from "../../Utils/crudFunction";
import {useUpc} from "../../Utils/hooks/upc";
import Alert from "react-bootstrap/Alert";
import LinearProgress from '@material-ui/core/LinearProgress';


const InventorySettings = (props) => {
    const display_name = localStorage.getItem('portalDisplay') ? localStorage.getItem('portalDisplay') : '';
    const mapped_items = localStorage.getItem('abacusUpcMap') ? localStorage.getItem('abacusUpcMap') : false;
    const settings = localStorage.getItem('abacusSettings') ? localStorage.getItem('abacusSettings') : false;
    const inventory = useInventory();
    const portal = usePortal();
    const user =  useUserProfile();
    const upc_map = useUpcMap();
    const upc_codes = useUpc();
    const state = useSelector(state => state);
    const [upcMap, setUpcMap] = useState(JSON.parse(mapped_items));
    const [integration, setIntegration] = useState('');
    const [displayName, setDisplayName] = useState(display_name);
    const [alertAmount, setAlertAmount] = useState(0);
    const [activeCode, setActiveCode] = useState('');
    const [open, setOpen] = useState(false);
    const [mappedItems, setMappedItems] = useState([]);
    const [inputFields, setInputFields] = useState([]);
    const [currentUpc, setCurrentUpc] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [showAddMapInput, setShowAddMapInput] = useState(false);
    const [displayUpc, setDisplayUpc] = useState([]);
    const [newUpc, setNewUpc] = useState('');
    const [pending, setPending] = useState(false);


    useEffect( () => {
        if(state.settings) {
            if(state.settings.settings.integration) {
                    setIntegration(state.settings.settings.integration)
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
    useEffect( () => {
        if(!settings) {
            if (state.settings) {
                if (state.settings.settings.inventoryAlertAmount) {
                    setAlertAmount(state.settings.settings.inventoryAlertAmount)
                }
            }
        }else{
            if(settings.inventoryAlertAmount){
                setAlertAmount(settings.inventoryAlertAmount)
            }

        }
    });

    useEffect( () => {
        if(portal.email){
            if(state.portal.portal.display_name) {
                    setDisplayName(state.portal.portal.display_name)
                }
            }
    },[portal]);

    useEffect( () => {
        if (upcMap) {
                if (inputFields.length < 1 && upcMap.upc_map) {
                    const values = [...inputFields];
                    for(let i = 0; i < upcMap.upc_map.length; i++){
                        values.push({upc: upcMap.upc_map[i].upc__upc, item:upcMap.upc_map[i].item__item_code, amount:upcMap.upc_map[i].amount});
                        setInputFields(values)
                    }

                }
            }else{
                if(upc_map){
                    if(upc_map.upc_map) {
                        setUpcMap(upc_map)
                    }
                }
        }

    },);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({upc: activeCode, item: '', amount: 0});
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
    function item_to_desc(upc){
        for(let i = 0; i < displayUpc.length; i++){
            if(upc === displayUpc[i].upc){
                return upc + " - " + displayUpc[i].desc
            }
        }
    }

    function getMapped(mapped) {
        if(mapped) {
            let _upcs = new Set();
            let upcs = mapped.forEach((upc) => _upcs.add(upc.upc__upc + " " + upc.upc__desc));
            _upcs = [..._upcs];
            let counts = _upcs.map((upc, index) => {
                return (
                    <Chip
                        variant="outlined"
                        avatar={<Avatar style={{background: "white", color: "#3196b2"}}><FontAwesomeIcon
                            icon={faMapMarkedAlt}/></Avatar>}
                        label={upc}
                        color="primary"
                        clickable="true"
                        onClick={() => triggerDialog(upc.split(/\s+(.*)/)[0], 'edit')}
                        style={{
                            color: "white",
                            background: "#3196b2",
                            marginTop: ".5em",
                            marginLeft: ".25em",
                            fontWeight: "700"
                        }}
                    />
                )
            });
            return counts
        }
    }
    const handleAddMap = () =>{
        setShowAddMapInput(true)
    };

    const handleInputChange2 = (index, event, defaults) => {
        const { name, value } = event.currentTarget;
        const values = [...inputFields];
        values[index].upc = currentUpc;
        if(name === "item") {
            if(value !== undefined) {
                values[index].item = value;
            }else{
                values[index].item = defaults[0];
            }
        } else {
            if(value !== undefined) {
                values[index].amount = parseInt(value);
            }else {
                values[index].amount = parseInt(defaults[1]);
            }
        }
        setInputFields(values);
    };

    const handleNewMapChange = (event) => {
        const {name, value} = event.currentTarget;
        if(name === 'new_map'){
            let check_exists = false;
            for(let i = 0; i <inputFields.length; i++){
                if(inputFields[i].upc === value){
                    alert('You already mapped the supply items for this code. You can edit or remove the code by clicking on it in the UPC Maps section')
                    check_exists = true;
                    break;
                }
            }
            if(check_exists === false) {
                setNewUpc(value);
                setActiveCode(value);
            }
        }
    };

     const handleInputChange = (event) => {
         const {name, value} = event.currentTarget;

         if (name === "alert") {
              setAlertAmount(value);
              updateSettings(state.settings.settings.id, "inventoryAlertAmount", value);
         }
     };

    function triggerDialog(upc, type) {
        setActiveCode(upc);
        handleClickOpen();
        setCurrentUpc(upc);
        if(type === 'new'){
            handleAddFields();
            setShowAddMapInput(false)
        }

    }
    const handleClickOpen = () => {
            setOpen(true);
        };
    const handleClose = (action) => {
        if (action === 'save'){
            if(newUpc){
                const values = upcMap;
                for(let i = 0; i < inputFields.length; i ++) {
                    if(inputFields[i].upc === newUpc) {
                        values.upc_map.push({upc__upc: newUpc, upc__desc: item_to_desc(newUpc), item__item_code: inputFields[i].item, amount: inputFields[i].amount})
                    }
                    setUpcMap(values);
                    setNewUpc(false)
                }
            }else{
                const values = upcMap;
                for(let i = 0; i < inputFields.length; i ++) {
                    if (inputFields[i].upc === currentUpc) {
                        values.upc_map.push({
                            upc__upc: currentUpc,
                            upc__desc: item_to_desc(currentUpc),
                            item__item_code: inputFields[i].item,
                            amount: inputFields[i].amount
                        })
                    }
                    setUpcMap(values);
                }
            }
            setShowSave(true);
        }
        setOpen(false);
        };

    async function handleSubmit() {
        try {
            setPending(true)
            let payload = JSON.stringify(upcMap);
            let submitted = await submitUpcMap(user.portal.id, state.auth.token.i, payload, 'put');
            if (await submitted.status === 200) {
                setPending(false)
                setShow(true)
            }if(submitted === 'error'){
                setError(true)
            }

        }catch(err){
            setError(true)
        }
    }
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/inventory">Inventory</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Inventory Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                 <Card.Header><FontAwesomeIcon icon={faCog} /> Inventory Settings</Card.Header>

                <Card.Body>
                    {
                        pending && (
                                <LinearProgress style={{backgroundColor: "#3196b2"}}/>
                        )
                    }
                    { show && (
                         <Alert variant='success' style={sign_up_style.alertStyle} >
                            Your UPC inventory map updates have been saved!
                        </Alert>
                    )}
                    { error && (
                         <Alert variant='danger' style={sign_up_style.alertStyle} >
                            Oops! Something went wrong!
                        </Alert>
                    )}
                    <div style={{width:"50%"}}>
                        <Row>
                        <h4 className="header-bold spacer"><Avatar style={{display:"inline-flex", background:"#3196b2", marginLeft: ".75em"}}><FontAwesomeIcon icon={faTooth}/></Avatar> {displayName}</h4>
                        </Row>
                        <Divider />
                        <Row style={{margin:"1.5em 0"}}>
                            <Col>
                                <h4 className="spacer">Integration</h4>
                            </Col>
                            <Col>
                                {integration.length < 1 && (
                                    <h4 className="spacer"><Badge variant="secondary">None</Badge></h4>
                                )}{integration.length > 0 && (
                                    <h4 className="spacer"><Badge variant="success">{integration}</Badge></h4>
                                )}
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{margin:"1.5em 0"}}>
                            <Col>
                                <h4 className="spacer">UPC Maps</h4>
                                <h5 style={{color:"#3196b2", cursor:"pointer", marginBottom:"1.5em"}} onClick={()=> handleAddMap() }><FontAwesomeIcon icon={faFolderPlus}/> Add Mapping</h5>
                                { showAddMapInput && (
                                    <>
                                        <Autocomplete
                                                   id="combo-box-demo"
                                                   options={displayUpc}
                                                   value={newUpc}
                                                   getOptionLabel={(option) => option.upc}
                                                   renderOption={(option) => {
                                                       return (
                                                           <React.Fragment>
                                                               {item_to_desc(option.upc)}
                                                           </React.Fragment>
                                                       )
                                                   }}
                                                   renderInput={(params) => <TextField {...params}
                                                                                       label="UPC code"
                                                                                       variant="outlined"
                                                                                       onBlur={event => handleNewMapChange(event)}
                                                                                       name="new_map"
                                                                                       inputProps={{
                                                                                           ...params.inputProps
                                                                                       }}/>}
                                               />
                                           <Button variant="info" onClick={ () => triggerDialog(newUpc, 'new')} style={{marginTop:"2em", backgroundColor: "#3196b2"}}>Map</Button>
                                        </>
                                )}
                            </Col>
                            <Col>
                                { getMapped(upcMap.upc_map)}

                                { showSave && (
                                    <Button variant="info" style={{marginTop:"2em", backgroundColor: "#3196b2"}} onClick={ () => handleSubmit() }>Save Mappings</Button>
                                )}
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{margin:"1.5em 0"}}>
                            <Col>
                                <h4 className="spacer">Alert Settings <OverlayTrigger placement="right" overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Define the amount at which you will receive an alert for when the item quantity falls below a certain threshold
                                    </Tooltip>}>
                                    <FontAwesomeIcon icon={faQuestionCircle} style={{color: "#3196b2", fontSize:".5em", verticalAlign: "top"}}/>
                            </OverlayTrigger> </h4>
                            </Col>
                            <Col>
                                <TextField
                                    label="amount"
                                    variant="outlined"
                                    type="number"
                                    name="alert"
                                    value={alertAmount}
                                    onChange={event => handleInputChange(event)}
                                />
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
               <DialogTitle style={{background:"#191e28"}}>
                   <h3 style={{color:"white"}}><FontAwesomeIcon icon={faMapMarkedAlt} style={{marginRight:".5em"}}/>
                   Edit Mapping for: <span style={{fontWeight:"bold"}}>{activeCode}</span></h3>
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

                       {inputFields.map((inputField, index) => (
                           activeCode === inputField.upc ? (
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
                                                                               onBlur={event => handleInputChange2(index, event, [inputField.item, inputField.amount])}
                                                                               label={inputField.item}
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
                                           defaultValue={inputField.amount}
                                           onChange={event => handleInputChange2(index, event)}
                                       />
                                   </Col>
                                   <Col xs={3}>
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
                           </Fragment>) : '' ) )}
                   </Form>
               </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('cancel')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={ () => handleClose('save')} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
             <style dangerouslySetInnerHTML={{__html: `
                   .MuiFormLabel-root {
                        color:black
                    }
                `}}></style>
        </div>
    )
};

export default InventorySettings;
