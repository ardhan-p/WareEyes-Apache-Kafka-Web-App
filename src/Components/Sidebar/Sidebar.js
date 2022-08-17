import React from "react";
import { useNavigate, Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./Sidebar.css";

function Sidebar() {
  let navigate = useNavigate();

  let notificationCounter = window.localStorage.getItem("notificationCounter");

  function AdminTools() {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      return (
        <Link to="/AdminTools">
          <li>
            <AdminPanelSettingsIcon className="icon" />
            <span className="title"> Admin Tools </span>
          </li>
        </Link>
      );
    }
      console.log(" user is not admin");
      return;
    }

  return (
    <div className="sidebar">
      <Link to="/DashBoard">
        <div className="top">
          <span className="logo"> WareEyes </span>
        </div>
      </Link>
      <div className="center">
        <ul>
          <Link to="/DashBoard">
            <li>
              <HouseIcon className="icon" />
              <span className="title"> Dashboard </span>
            </li>
          </Link>
          <Link to="/MonitorData">
            <li>
              <BarChartIcon className="icon" />
              <span className="title"> Monitor Data </span>
            </li>
          </Link>
          <Link to="/Notifications">
            <li>
              <NotificationsNoneIcon className="icon" />
              <div className="counter">{notificationCounter}</div>
              <span className="title"> Notification </span>
            </li>
          </Link>
          <AdminTools />
          <Link to="/Settings">
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
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("userID");
            window.localStorage.removeItem("currentEmail");
            window.localStorage.removeItem("currentName");
            window.localStorage.removeItem("isAdmin");

            window.localStorage.removeItem("topic1Name");
            window.localStorage.removeItem("topic2Name");
            window.localStorage.removeItem("topic3Name");
            window.localStorage.removeItem("topic4Name");

            window.localStorage.removeItem("topic1Threshold");
            window.localStorage.removeItem("topic2Threshold");
            window.localStorage.removeItem("topic3Threshold");
            window.localStorage.removeItem("topic4Threshold");
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 600);
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
