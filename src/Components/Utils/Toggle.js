import React from "react";

const Toggle = (props) => {

    return (
    <label className="switch">
       <input type="checkbox" name={props.name} value={props.checked} onClick={event => props.onToggle(event)} checked={props.checked}/>
         <span className="slider round"></span>
    </label>
    );
};
export default Toggle;