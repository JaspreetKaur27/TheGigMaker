import React from "react";

// Column used to responsively display each player in the card-deck
const Column = props => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      {props.children}
    </div>
  );
};

export default Column;