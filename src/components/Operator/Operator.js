import React from "react";
import './Operator.css'
const Operator = (props) => {
  return (
    <div className="btn-wrapper" onClick={props.click}>{props.children}</div>
  );
};

export default Operator;
