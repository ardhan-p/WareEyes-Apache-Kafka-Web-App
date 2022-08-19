import React, { useContext } from "react";
import { getCustomFullDateAndTimeWithAmPm } from "@hirishu10/simple-date-time";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { DarkModeContext } from "../../Context/darkModeContext";
import "./Navbar.css";

// navbar component will render on each page
function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const timestampLower = getCustomFullDateAndTimeWithAmPm();

  // check if the user has the admin role permission
  function CheckIsAdmin() {
    const isAccType = window.localStorage.getItem("isAdmin");
    if (isAccType) {
      return <UserName />;
    }
  }

  // display name of user once is logged in
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
          <CheckIsAdmin />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
