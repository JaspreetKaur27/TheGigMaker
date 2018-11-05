import React from "react";


const Row = props =>
  
  <div className={`row ${props.wrong ? "shake" : ""}`}>
    {props.children}
  </div>;

export default Row;