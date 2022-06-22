import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import "./AlertNotifcation.css";

export default function AlertNotifcation() {
  const timestampLower = getCustomFullDateAndTimeWithAmPm();
  return (
    <div className="alertnotifcation">
      <div className="alert-icon">
        <ErrorOutlineIcon />
      </div>
      <div className="alert-message">
        Dataset 1 passed threshold “50”
        <div className="alert-time">{timestampLower}</div>
        <button type="button" className="cancel-icon"><CancelOutlinedIcon /></ button>
      </div>
    </div>
  );
}
