import React from "react";

export default function Dice(props){

    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    
    }

    return(
        <div className="die " onClick={props.changeHold} style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}