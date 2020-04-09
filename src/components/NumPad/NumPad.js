import React from "react";
import './NumPad.css'

const NumPad = (props) => {

  return (
      <div className="numPad" onClick={props.click}>{props.children}</div>
  );
};

export default NumPad;
