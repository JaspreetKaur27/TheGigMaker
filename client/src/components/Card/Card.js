import React from "react";
import "./Card.css";

const Card = props => (
    <div className="card mx-auto" value={props.id} onClick={() => props.handleShow()}>
        <div className="card-body">
        {props.children}
        </div>
    </div>
);

export default Card;