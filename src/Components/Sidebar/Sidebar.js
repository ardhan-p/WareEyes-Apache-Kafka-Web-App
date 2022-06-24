import React from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";



function Sidebar() {
  let navigate = useNavigate();

  return (
    <div className="sidebar">
      <Link to="/DashBoard">
        <div className="top">
          <span className="logo"> WareEyes </span>
        </div>
      </Link>
      <div className="center">
        <ul>
          <Link to="/wareeyes-reactjs-frontend/DashBoard">
            <li>
              <HouseIcon className="icon" />
              <span className="title"> Dashboard </span>
            </li>
          </Link>
          <Link to="/wareeyes-reactjs-frontend/MonitorData">
            <li>
              <BarChartIcon className="icon" />
              <span className="title"> Monitor Data </span>
            </li>
          </Link>
          <Link to="/wareeyes-reactjs-frontend/Notifications">
            <li>
              <NotificationsNoneIcon className="icon" />
              <div className="counter">1</div>
              <span className="title"> Notification </span>
            </li>
          </Link>
          <Link to="/wareeyes-reactjs-frontend/Settings">
            <li>
              <SettingsIcon className="icon" />
              <span className="title"> Settings</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <button
          className="logout-btn"
          type="button"
          onClick={() => {
            navigate("/wareeyes-reactjs-frontend/Login");
          }}
        >
          {" "}
          <LogoutIcon className="logout-icon" /> Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
