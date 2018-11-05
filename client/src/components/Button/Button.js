import React from "react";

const Button = props => (
  <button {...props} className="btn btn-success">
    {props.children}
  </button>
);

export default Button;