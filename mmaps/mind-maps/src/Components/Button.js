import React, { useState } from 'react';


function Button(props){
    const [ bgcolor, setBgColor ] = useState(props.color);
    const styles = {
        color: "white", 
        backgroundColor: bgcolor, 
        width: "100px",
        height: (props.height)? props.height : "30px", 
        border: "none",
        borderRadius: "3px",
        margin:"5px"
    };
    return (<button className="button" style={styles} onClick={props.handleClick} onMouseEnter={()=>{setBgColor(props.finalcolor)}} onMouseLeave={()=>{setBgColor(props.color)}}>
        {props.text}
    </button>);
}

export default Button;