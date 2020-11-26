import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Toggle from "../Utils/Toggle";

const Permissions = () => {
    const [profile, setProfile] = useState(false);
    const [user, setUser] = useState([]);
    const [inventoryUpdate, setInventoryUpdate] = useState(false)
    let state = useSelector(state => state);

    const handleSwitch = (event) => {
        const { name, value } = event.currentTarget;
        if(name === "inventoryUpdate") {
            if(value === 'false') {
                setInventoryUpdate(true);
            }
            if(value === 'true'){
                setInventoryUpdate(false)
            }
        }
    };

    const Switcher = (props) => {
        return (
                  <Toggle
                      name="inventoryUpdate"
                      value={props.action}
                      checked={props.action}
                      onToggle={handleSwitch}
                  />
        )
    };

    return (
        <Container>
        <Card>
            <Card.Body>
                <h4 style={{fontWeight: "700", marginBottom:"2em"}}><FontAwesomeIcon icon={faEyeSlash}/> Security & Permissions</h4>
                <TableContainer component={Paper} style={{width:"60%"}}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{width:"70%", fontSize: "18px", fontWeight:"700", padding:"8px", backgroundColor:"#3196b2", color:"white", border: "2px solid white"}} size="medium">Action</TableCell>
                            <TableCell style={{backgroundColor:"#3196b2", fontSize: "18px", fontWeight:"700", padding:"8px", color:"white", border: "2px solid white"}} size="small">Permission</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                         <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can update inventory</TableCell>
                             <TableCell><Switcher action={inventoryUpdate}/></TableCell>
                         </TableRow>
                            <TableRow>
                             <TableCell style={{fontSize: "16px", padding:"8px"}}>Users can update inventory</TableCell>
                             <TableCell><Switcher action={inventoryUpdate}/></TableCell>
                         </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
            </Card.Body>
        </Card>
        </Container>
    )
}
export default Permissions;