import React from "react";

// Column used to responsively display each player in the card-deck
const Column = props => {
  return (
    <div className="lg-6 md-4 sm-6">
      {props.children}
    </div>
  );
};

export default Column;