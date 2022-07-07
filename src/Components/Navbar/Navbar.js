import React, { useContext } from "react";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { DarkModeContext } from "../../Context/darkModeContext";

function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const timestampLower = getCustomFullDateAndTimeWithAmPm();


  return (
    <div className="navbar">
      <div className="warpper">
        <div className="light-dark">
          <DarkModeOutlinedIcon className="dark" onClick={() => dispatch({ type: "TOGGLE" }) } />
        </div>
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
