import React from "react";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const timestampLower = getCustomFullDateAndTimeWithAmPm();

  return (
    <div className="navbar">
      <div className="warpper">
        <div className="date-time">{timestampLower}</div>
        <div className="profile">
          <AccountCircleIcon className="profile-icon" />
          user
        </div>
      </div>
    </div>
  );
}

export default Navbar;
