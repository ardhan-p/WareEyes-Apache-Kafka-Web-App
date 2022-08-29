import React from "react";
import "./widget.css";

// widget component to display topic title
function Widget({topicTitle, counter, name}) {

  return (
    <div className="widgets">
      <div className="top-widget">{topicTitle}</div>
      <label className="widget-threshold">{name}</label>
      <h2>{counter}</h2>
    </div>
  );
}

export default Widget;
