import React, { useContext } from "react";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { DarkModeContext } from "../../Context/darkModeContext";

function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const timestampLower = getCustomFullDateAndTimeWithAmPm();

  function Name() {
    const isAccType = window.localStorage.getItem("isAdmin");
    if (isAccType) {
      return <UserName />;
    }
  }

  function UserName() {
    const email = window.localStorage.getItem("currentEmail");
    const name = email.substring(0, email.indexOf('@'));

    return name;
  }


  return (
    <div className="navbar">
      <div className="warpper">
        <div className="light-dark">
          <DarkModeOutlinedIcon className="dark" onClick={() => dispatch({ type: "TOGGLE" }) } />
        </div>
        <div className="date-time">{timestampLower}</div>
        <div className="profile">
          <AccountCircleIcon className="profile-icon" /> 
          <Name />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
