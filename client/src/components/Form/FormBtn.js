import React from "react";
import "./FormBtn.css";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 15 }} className="button4">
    {props.children}
  </button>
);
