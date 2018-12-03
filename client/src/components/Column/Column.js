import React from "react";

const Column = props => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      {props.children}
    </div>
  );
};

export default Column;