import React from 'react';


function Button(props){
    const styles = {
        color: "white", 
        backgroundColor: props.color, 
        width: "100px",
        height: "30px", 
        border: "none",
        borderRadius: "3px",
    };
    return (<button style={styles} onClick={props.handleClick}>
        {props.text}
    </button>);
}

export default Button;