import React, {Fragment, useEffect, useState} from "react";
import {sign_up_style} from "../../Styles";
import {homepage_style} from "../../Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faFileUpload, faListOl} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import {getProfile} from "../../actions";
import {Link, useHistory} from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {submitInitialInventory, submitUpc} from "../../Utils/crudFunction";
import {useUpc} from "../../Utils/hooks/upc";
import Dropzone from "react-dropzone";
import csv from "csv";
import parseExcel from "../Utils/parseExcel";

const AddProcedures = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const upc_codes = useUpc();
    const [method, setMethod] = useState('individual');
    const [displayUpc, setDisplayUpc] = useState([]);
    let app_state = useSelector(state => state);
    const [inputFields, setInputFields] = useState([
       { upc: '', amount: '' }
    ]);
    const [file, setFile] = useState(false);
    const [headers, setHeaders] = useState(false);


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
        if(upc_codes) {
            if (upc_codes.codes) {
                setDisplayUpc(upc_codes.codes)
            }
        }
    },[upc_codes]);

    useEffect(() => {
        if (file) {
            let output;
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading failed");
            reader.onload = () => {
                if (file.type !== 'text/csv'){
                    output = parseExcel(reader)
                }else{
                    output = reader.result
                }
                csv.parse(output, (err, data) => {
                    let i = 0;
                    let row;
                    for(let _row = 0; _row < data.length; _row++){
                        if(data[_row][0] !== ''){
                            row = _row;
                            _row = data.length;
                            break;
                        }
                    }
                    let column_headers = [];
                     while (i < data[row].length) {
                        if (data[row][i]) {
                            let header_data = data[row][i].replace(/[^\x20-\x7E]+/g, "");
                            header_data = header_data.replace(/\s/g, '');
                            header_data = header_data.toLowerCase();
                            column_headers.push(header_data);
                            i++;
                        }
                    }
                    if (i === data[row].length)
                        setHeaders((column_headers.length > 0 ? column_headers : []))
                });
            };
            file.forEach(file => reader.readAsBinaryString(file));
        }
    }, [file]);

    const handleDrop = acceptedFiles => {
        if (acceptedFiles[0].type === 'text/csv') {
            setFile(acceptedFiles)
        } else if (acceptedFiles[0].type === 'application/vnd.ms-excel' || acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setFile(acceptedFiles)
        } else {
            alert('The file type you have selected is not supported. Please provide a CSV or Microsoft Excel file type to continue')
        }
    };
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
        for(let i = 0; i < displayUpc.length; i++){
            if(upc === displayUpc[i].upc){
                return upc + " - " + displayUpc[i].desc
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
        const submitted = submitUpc(user.portal.id, app_state.auth.token.i, payload);
        history.push("/inventory")
    }
    if (method === 'individual') {
        return (
            <div>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListOl}/> Record Completed Procedures<span
                        style={{float: 'right'}}>
                        <Link onClick={() => setMethod('bulk')}>[<FontAwesomeIcon
                            icon={faEllipsisH}/>] Bulk Upload</Link></span></Card.Header>
                    <Card.Body>
                        <Card variant="success" className="mb-3 card-callout">
                            <Card.Body className="border-success">
                                <Card.Title>
                                    Update Your Inventory By Recording the Procedures You Completed
                                </Card.Title>
                                <p>
                                    Use the form below to add the amount of each prodedure you ran since your last inventory supply update.
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
                                                    getOptionLabel={(option) => option.upc}
                                                    renderOption={(option) => {
                                                        return (
                                                            <React.Fragment>
                                                                {item_to_desc(option.upc)}
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
    }if(method === 'bulk'){
        return(
             <div>
                <Card>
                    <Card.Header><FontAwesomeIcon icon={faListOl}/> Record Completed Procedures<span
                        style={{float: 'right'}}>
                        <Link onClick={() => setMethod('individual')}>[<FontAwesomeIcon
                            icon={faEllipsisH}/>] Individual Add</Link></span></Card.Header>
                    <Card.Body>
                        <div>
                            <Dropzone accepts=".csv, application/vnd.ms-excel, text/csv" onDrop={handleDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: "dropzone"})}>
                                        <input {...getInputProps()} />
                                        <Card className="upload-drop-zone p-3" id="drop-zone" style={{border:"none"}}>
                                            <Card.Body className="border-info rounded p-5" style={{border: '2px dashed'}}>
                                                <div className="text-center">
                                                    <p>
                                                        <FontAwesomeIcon icon={faFileUpload} style={{fontSize:"88px", color:"#a9a9a9"}}/>
                                                    </p>
                                                    <p className="lead">
                                                        Drag and drop your Excel or CSV export file here or click to <a href="#">Browse</a>
                                                    </p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default AddProcedures;