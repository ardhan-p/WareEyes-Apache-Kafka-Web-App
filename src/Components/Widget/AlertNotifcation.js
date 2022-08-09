import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import "./AlertNotifcation.css";
import Collapse from '@mui/material/Collapse';

function AlertNotifcation({topic, threshold}) {
  const [open, setOpen] = React.useState(true);
  const timestampLower = getCustomFullDateAndTimeWithAmPm();

  return (
    <Collapse in={open}>
    <div className="alertnotifcation">
      <div className="alert-icon">
        <ErrorOutlineIcon />
      </div>
      <div className="alert-message">
        {topic} passed threshold “{threshold}”
        <div className="alert-time">{timestampLower}</div>
        <button type="button" className="cancel-icon" onClick={() => {
                setOpen(false);
              }}><CancelOutlinedIcon /></ button>
      </div>
    </div>
    </Collapse>
  );
}

export default AlertNotifcation;