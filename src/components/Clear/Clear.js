import React from "react";
import './Clear.css'

const Clear = (props) => {
  return (
    <div className="clear" onClick={props.click}>clear</div>
  );
};

export default Clear;
